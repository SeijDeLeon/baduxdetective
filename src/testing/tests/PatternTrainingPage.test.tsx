import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PatternTrainingPage from '../../app/pages/PatternTrainingPage';

vi.mock('@/components/PlotlyHeatmap', () => ({
    default: ({ array }: { array: number[][] }) => <div data-testid="heatmap">{array[0][0]}</div>,
}));

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

function next() {
    fireEvent.click(screen.getByRole('button', { name: 'Next pattern' }));
}
function openPattern(number: number) {
    render(<PatternTrainingPage />);
    for (let index = 1; index < number; index++) next();
    fireEvent.click(screen.getByRole('button', { name: 'Show solution' }));
    return within(screen.getByRole('region', { name: /^Solution:/ }));
}

describe('pattern solutions', () => {
    it('shows a short intro and first-pattern guidance before the exercises begin', () => {
        render(<PatternTrainingPage />);

        expect(screen.getByRole('heading', { name: 'Pattern Training' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Bad UX Detective' })).toHaveAttribute('href', '/');
        expect(
            screen.getByText(/spot the weak interaction and compare it to a stronger alternative/i),
        ).toBeInTheDocument();
        expect(
            screen.getByText((content) =>
                content.includes('Focus on whether the action looks clickable') &&
                content.includes('how the interface guides your next move'),
            ),
        ).toBeInTheDocument();
    });

    it('reveals and hides a solution for all 31 patterns, resetting on navigation', () => {
        render(<PatternTrainingPage />);
        for (let number = 1; number <= 31; number++) {
            expect(screen.getByText(`Pattern ${number} of 31`)).toBeInTheDocument();
            expect(screen.queryByRole('region', { name: /^Solution:/ })).not.toBeInTheDocument();
            const toggle = screen.getByRole('button', { name: 'Show solution' });
            expect(toggle).toHaveAttribute('aria-expanded', 'false');
            fireEvent.click(toggle);
            expect(screen.getByRole('region', { name: /^Solution:/ })).toBeInTheDocument();
            expect(toggle).toHaveAttribute('aria-expanded', 'true');
            fireEvent.click(screen.getByRole('button', { name: 'Hide solution' }));
            expect(screen.queryByRole('region', { name: /^Solution:/ })).not.toBeInTheDocument();
            fireEvent.click(toggle);
            if (number < 31) next();
        }
        expect(screen.getByRole('button', { name: 'Next pattern' })).toBeDisabled();
        fireEvent.click(screen.getByRole('button', { name: 'Previous pattern' }));
        expect(screen.queryByRole('region', { name: /^Solution:/ })).not.toBeInTheDocument();
    }, 20000);

    it('keeps the original state when toggling and isolates solution interactions', () => {
        render(<PatternTrainingPage />);
        fireEvent.click(screen.getByRole('button', { name: 'Start Scan' }));
        fireEvent.click(screen.getByRole('button', { name: 'Show solution' }));
        const solution = within(screen.getByRole('region', { name: /^Solution:/ }));
        expect(solution.queryByText('Scan started.')).not.toBeInTheDocument();
        fireEvent.click(solution.getByRole('button', { name: 'Start Scan' }));
        expect(screen.getAllByText('Scan started.')).toHaveLength(2);
        fireEvent.click(screen.getByRole('button', { name: 'Hide solution' }));
        expect(screen.getByText('Scan started.')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Refresh Pattern' }));
        expect(screen.queryByText('Scan started.')).not.toBeInTheDocument();
    });

    it('shows saving feedback followed by completion', () => {
        vi.useFakeTimers();
        const solution = openPattern(7);
        fireEvent.click(solution.getByRole('button', { name: 'Save Settings' }));
        expect(solution.getByRole('button', { name: 'Saving…' })).toBeDisabled();
        expect(solution.getByRole('status')).toHaveTextContent('Saving settings…');
        act(() => vi.advanceTimersByTime(1000));
        expect(solution.getByRole('status')).toHaveTextContent('Settings saved.');
        expect(solution.getByRole('button', { name: 'Save Settings' })).toBeEnabled();
    });

    it.each([8, 9])('keeps the plot mounted and announces loading for pattern %s', (number) => {
        vi.useFakeTimers();
        const solution = openPattern(number);
        const plot = solution.getByTestId('heatmap');
        fireEvent.change(solution.getByRole('slider'), { target: { value: '1' } });
        expect(solution.getByRole('status')).toHaveTextContent('Loading slice 2');
        expect(solution.getByTestId('heatmap')).toBe(plot);
        act(() => vi.advanceTimersByTime(1000));
        expect(solution.getByRole('status')).toHaveTextContent('Showing slice 2');
        expect(solution.getByTestId('heatmap')).toBe(plot);
    });

    it('disables busy scan actions and marks required fields upfront', () => {
        const solution = openPattern(10);
        expect(solution.getByRole('button', { name: 'Start Scan' })).toBeDisabled();
        expect(solution.getByRole('status')).toHaveTextContent('Scan Engine Busy');
        next();
        fireEvent.click(screen.getByRole('button', { name: 'Show solution' }));
        const required = within(screen.getByRole('region', { name: /^Solution:/ }));
        expect(required.getByLabelText('Scan name (required)')).toBeRequired();
        expect(required.getByLabelText('Scan name (required)')).toBeInvalid();
    });

    it('only deletes through the delete button and restores the original order with Undo', () => {
        const solution = openPattern(12);
        fireEvent.click(solution.getByText('XANES scan'));
        expect(solution.getAllByRole('listitem')).toHaveLength(3);
        fireEvent.click(solution.getByRole('button', { name: 'Delete XANES scan' }));
        expect(solution.getAllByRole('listitem')).toHaveLength(2);
        fireEvent.click(solution.getByRole('button', { name: 'Undo' }));
        expect(solution.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
            'Sample alignmentDelete',
            'XANES scanDelete',
            'Dark frameDelete',
        ]);
    });

    it('places an actionable error by its field and accepts a correction', () => {
        const solution = openPattern(17);
        const energy = solution.getByLabelText('Energy (keV)');
        fireEvent.click(solution.getByRole('button', { name: 'Save Experiment' }));
        expect(energy).toHaveFocus();
        expect(energy).toHaveAttribute('aria-invalid', 'true');
        expect(energy).toHaveAccessibleDescription(
            'Enter an energy greater than 0 keV, for example 8.33.',
        );
        fireEvent.change(energy, { target: { value: '8.33' } });
        fireEvent.click(solution.getByRole('button', { name: 'Save Experiment' }));
        expect(solution.getByRole('status')).toHaveTextContent('Experiment saved.');
    });

    it('preserves edited entries on a failed save and supports retrying', () => {
        const solution = openPattern(18);
        fireEvent.change(solution.getByLabelText('Sample'), { target: { value: 'Copper foil' } });
        fireEvent.click(solution.getByRole('button', { name: 'Save' }));
        expect(solution.getByRole('alert')).toHaveTextContent('Your entries have been kept');
        expect(solution.getByLabelText('Sample')).toHaveValue('Copper foil');
        expect(solution.getByLabelText('Start energy')).toHaveValue('8.33');
        fireEvent.click(solution.getByRole('button', { name: 'Retry Save' }));
        expect(solution.getByRole('status')).toHaveTextContent('Scan saved.');
    });

    it('replaces free text with the three allowed size options', async () => {
        const user = userEvent.setup();
        const solution = openPattern(19);
        const select = solution.getByRole('combobox', { name: 'Step size' });
        expect(solution.getAllByRole('option').map((option) => option.textContent)).toEqual([
            'Small',
            'Medium',
            'Large',
        ]);
        await user.selectOptions(select, 'large');
        await user.click(solution.getByRole('button', { name: 'Start Scan' }));
        expect(select).toHaveValue('large');
        expect(solution.getByRole('status')).toHaveTextContent('Scan started.');
    });

    it('groups the same analysis controls into named sections and keeps them interactive', () => {
        const solution = openPattern(25);
        const original = within(
            screen.getByRole('region', { name: 'Ungrouped analysis controls' }),
        );
        expect(original.getAllByRole('combobox')).toHaveLength(8);
        expect(solution.getAllByRole('combobox')).toHaveLength(8);
        expect(original.queryByRole('heading', { name: 'Preprocessing' })).not.toBeInTheDocument();
        const fitting = within(solution.getByRole('region', { name: 'Peak Fitting' }));
        expect(fitting.getByLabelText('Peak model')).toBeInTheDocument();
        expect(fitting.getByLabelText('Number of peaks')).toBeInTheDocument();
        for (const name of ['Data', 'Preprocessing', 'Peak Fitting', 'Results']) {
            expect(solution.getByRole('heading', { name })).toBeInTheDocument();
        }
        fireEvent.change(fitting.getByLabelText('Peak model'), { target: { value: 'Voigt' } });
        fireEvent.click(fitting.getByRole('button', { name: 'Run Peak Fit' }));
        expect(solution.getByRole('status')).toHaveTextContent('using the Voigt model');
        expect(original.getByLabelText('Peak model')).toHaveValue('Gaussian');
    });

    it('reorders using keyboard-activated controls and announces the result', async () => {
        const user = userEvent.setup();
        const solution = openPattern(24);
        const moveDown = solution.getByRole('button', { name: 'Move Dark frame down' });
        moveDown.focus();
        await user.keyboard('{Enter}');
        expect(solution.getAllByRole('listitem')[0]).toHaveTextContent('Sample alignment');
        expect(solution.getByRole('status')).toHaveTextContent(
            'Dark frame moved to position 2 of 3',
        );
        expect(solution.getByRole('button', { name: 'Move Sample alignment up' })).toBeDisabled();
    });

    it('truncates overflowing text in pattern 31 while retaining the full value', () => {
        const solution = openPattern(31);
        const filename =
            '2026-09-18_beamline-8.3.2_high-resolution-nickel-calibration_run-004281.h5';
        const value = solution.getByTitle(filename);

        expect(value).toHaveTextContent(filename);
        expect(value).toHaveClass('truncated-text');
    });
});
