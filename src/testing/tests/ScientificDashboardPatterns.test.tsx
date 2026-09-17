import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Patterns from '../../app/pages/ScientificDashboardPatterns';

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

describe('scientific dashboard examples', () => {
    it('keeps the selected sample and its provenance together', () => {
        render(<Patterns.ClearSampleIdentity />);
        fireEvent.click(screen.getByRole('button', { name: 'Ni catalyst · after heating' }));
        expect(
            screen.getByRole('heading', { name: 'Ni catalyst · after heating' }),
        ).toBeInTheDocument();
        expect(screen.getByText('RUN-0043')).toBeInTheDocument();
        expect(screen.getByText('17 Sep 2026, 10:08 UTC')).toBeInTheDocument();
        expect(screen.getByText('Catalyst temperature series')).toBeInTheDocument();
        expect(screen.queryByText('RUN-0042')).not.toBeInTheDocument();
    });

    it('demonstrates a reset in the original and preserves channel and zoom in the solution', () => {
        render(
            <>
                <Patterns.LostAnalysisContext />
                <Patterns.PreservedAnalysisContext />
            </>,
        );
        const [original, solution] = screen
            .getAllByRole('region', { name: 'Analysis context example' })
            .map((element) => within(element));
        for (const example of [original, solution]) {
            fireEvent.change(example.getByLabelText('Signal channel'), {
                target: { value: 'Transmission' },
            });
            fireEvent.click(example.getByRole('button', { name: 'Zoom to Peak' }));
            fireEvent.click(example.getByRole('button', { name: 'Table', exact: true }));
            fireEvent.click(example.getByRole('button', { name: 'Chart', exact: true }));
        }
        expect(original.getByRole('status')).toHaveTextContent(
            'Fluorescence · Energy range: 8.00–9.00 keV',
        );
        expect(solution.getByRole('status')).toHaveTextContent(
            'Transmission · Energy range: 8.30–8.40 keV',
        );
        expect(solution.getByRole('img')).toHaveAccessibleName(
            'Transmission spectrum, zoomed to the peak',
        );
        fireEvent.click(solution.getByRole('button', { name: 'Reset Zoom' }));
        expect(solution.getByRole('status')).toHaveTextContent(
            'Transmission · Energy range: 8.00–9.00 keV',
        );
    });

    it('previews acquisition cost before starting and updates estimates when settings change', () => {
        render(
            <>
                <Patterns.HiddenAcquisitionCost />
                <Patterns.VisibleAcquisitionCost />
            </>,
        );
        const [original, solution] = screen
            .getAllByRole('region', { name: 'Acquisition cost example' })
            .map((element) => within(element));
        expect(original.queryByText('Estimated acquisition cost')).not.toBeInTheDocument();
        expect(solution.getByText('300')).toBeInTheDocument();
        expect(solution.getByText('3.0 minutes')).toBeInTheDocument();
        expect(solution.getByText('1.17 GiB')).toBeInTheDocument();
        fireEvent.change(solution.getByLabelText('Repeats'), { target: { value: '6' } });
        expect(solution.getByText('600')).toBeInTheDocument();
        expect(solution.getByText('6.0 minutes')).toBeInTheDocument();
        expect(solution.getByText('2.34 GiB')).toBeInTheDocument();
        fireEvent.click(solution.getByRole('button', { name: 'Start Scan' }));
        expect(solution.getByRole('status')).toHaveTextContent('600 measurements scheduled');
        fireEvent.click(solution.getByRole('button', { name: 'Cancel Demo Scan' }));
        expect(solution.getByLabelText('Repeats')).toBeEnabled();
        fireEvent.change(solution.getByLabelText('Scan points'), { target: { value: '' } });
        expect(solution.getByRole('button', { name: 'Start Scan' })).toBeDisabled();
        expect(solution.queryByText('NaN')).not.toBeInTheDocument();
    });

    it('freezes disconnected data and only the solution identifies it as stale', () => {
        vi.useFakeTimers();
        render(
            <>
                <Patterns.StaleDataLooksLive />
                <Patterns.ClearlyStaleData />
            </>,
        );
        const [original, solution] = screen
            .getAllByRole('region', { name: 'Data freshness example' })
            .map((element) => within(element));
        for (const example of [original, solution])
            fireEvent.click(example.getByRole('button', { name: 'Simulate Connection Loss' }));
        act(() => vi.advanceTimersByTime(5000));
        expect(original.getByRole('status')).toHaveTextContent('Live');
        expect(solution.getByRole('status')).toHaveTextContent('Stale · Disconnected');
        expect(solution.getByText('Last updated 5 seconds ago')).toBeInTheDocument();
        expect(solution.getByText('Last known temperature')).toBeInTheDocument();
        fireEvent.click(solution.getByRole('button', { name: 'Reconnect' }));
        expect(solution.getByRole('status')).toHaveTextContent('Live');
        expect(solution.getByText('Last updated 0 seconds ago')).toBeInTheDocument();
    });

    it('rounds reported measurements and includes their uncertainty', () => {
        render(
            <>
                <Patterns.FalsePrecision />
                <Patterns.MeaningfulPrecision />
            </>,
        );
        const [original, solution] = screen
            .getAllByRole('region', { name: 'Measurement precision example' })
            .map((element) => within(element));
        expect(original.getByText('295.123847291 K')).toBeInTheDocument();
        expect(solution.getByText('± 0.02')).toBeInTheDocument();
        expect(solution.getByText('± 0.005')).toBeInTheDocument();
        expect(solution.getByText('± 0.003')).toBeInTheDocument();
        fireEvent.click(solution.getByRole('button', { name: 'Repeat Measurement' }));
        expect(solution.getByRole('status')).toHaveTextContent('Repeat measurement displayed');
        expect(solution.getByText('± 0.02')).toBeInTheDocument();
    });
});
