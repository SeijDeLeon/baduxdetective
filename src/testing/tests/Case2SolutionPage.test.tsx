import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Case2SolutionPage from '../../app/pages/Case2SolutionPage';
import { PRESET_HISTORY, bestPoint, buildAcquisitionSurface } from '../../app/pages/case2ScanSim';

// Plotly needs a real layout engine, so both plot components stand in as the
// data they were handed.
vi.mock('@/components/PlotlyHeatmap', () => ({
    default: ({ array }: { array: number[][] }) => (
        <div data-testid="detector-frame">{array.flat().reduce((sum, v) => sum + v, 0)}</div>
    ),
}));
vi.mock('@/components/PlotlyScatter', () => ({
    default: ({ data, className }: { data: { x: number[] }[]; className?: string }) => (
        <div data-testid={className}>{data[1]?.x.length ?? data[0]?.x.length ?? 0}</div>
    ),
}));

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

function openHistory() {
    fireEvent.click(screen.getByRole('tab', { name: 'History' }));
}

/**
 * Each acquisition timer is scheduled from an effect, so the clock has to be
 * advanced once per point with a commit in between.
 */
function acquire(points: number) {
    for (let index = 0; index < points; index++) {
        act(() => {
            vi.advanceTimersByTime(300);
        });
    }
}

describe('Case 2 solution scan console', () => {
    it('starts on the Run tab with a form and a run button at the bottom', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });

        expect(screen.getByRole('tab', { name: 'Run' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByLabelText('Motor 1')).toHaveValue('sample_x');
        expect(screen.getByLabelText('Motor 2')).toHaveValue('sample_y');
        expect(screen.getByLabelText('Detector')).toHaveValue('pilatus_2m');
        expect(screen.getByLabelText('Number of points')).toHaveValue(24);
        expect(screen.getByLabelText('Exposure time (s)')).toHaveValue(0.5);
        expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument();
        expect(screen.getByText(/no run loaded/i)).toBeInTheDocument();
    });

    it('acquires points one at a time and records the finished run in history', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText('Number of points'), { target: { value: '6' } });
        fireEvent.click(screen.getByRole('button', { name: 'Run' }));

        expect(screen.getByText('0 / 6 points')).toBeInTheDocument();
        act(() => {
            vi.advanceTimersByTime(300);
        });
        expect(screen.getByText('1 / 6 points')).toBeInTheDocument();

        acquire(6);
        expect(screen.getByText('6 / 6 points')).toBeInTheDocument();
        expect(screen.getByText('complete')).toBeInTheDocument();

        openHistory();
        // The finished run is prepended to the preset entries.
        const entries = screen.getAllByRole('button', { pressed: false });
        expect(entries).toHaveLength(PRESET_HISTORY.length + 1);
    });

    it('keeps only the acquired points when a run is aborted', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText('Number of points'), { target: { value: '10' } });
        fireEvent.click(screen.getByRole('button', { name: 'Run' }));
        acquire(3);
        fireEvent.click(screen.getByRole('button', { name: 'Abort' }));

        expect(screen.getByText('aborted')).toBeInTheDocument();
        expect(screen.getByText('3 / 3 points')).toBeInTheDocument();
        // A stopped run must not keep ticking.
        acquire(5);
        expect(screen.getByText('3 / 3 points')).toBeInTheDocument();
    });

    it('ships pre-made history entries and loads one into the views when clicked', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        openHistory();

        for (const run of PRESET_HISTORY) {
            expect(screen.getByText(run.id)).toBeInTheDocument();
        }

        const second = PRESET_HISTORY[1];
        fireEvent.click(screen.getByText(second.id));

        expect(screen.getByText(`Replaying ${second.status}`)).toBeInTheDocument();
        expect(
            screen.getByText(`${second.points.length} / ${second.points.length} points`),
        ).toBeInTheDocument();
        // The motor plot receives every point of the selected run.
        expect(screen.getByTestId('case-two-solution-scatter')).toHaveTextContent(
            String(second.points.length),
        );

        const best = bestPoint(second.points)!;
        expect(
            screen.getByText(
                new RegExp(
                    `Best so far: ${best.intensity.toFixed(3)} at ${second.settings.motorX}`,
                ),
            ),
        ).toBeInTheDocument();
    });

    it('labels the suggestion view with the position the surface picks', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        openHistory();
        const run = PRESET_HISTORY[0];
        fireEvent.click(screen.getByText(run.id));

        const { suggestion } = buildAcquisitionSurface(run.settings, run.points);
        const view = screen.getByRole('heading', { name: 'Next best position' }).closest('article');
        expect(
            within(view as HTMLElement).getByText(
                `${run.settings.motorX} ${suggestion.x.toFixed(2)}, ` +
                    `${run.settings.motorY} ${suggestion.y.toFixed(2)}`,
            ),
        ).toBeInTheDocument();
    });

    it('returns to the live run after viewing a history entry', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText('Number of points'), { target: { value: '4' } });
        fireEvent.click(screen.getByRole('button', { name: 'Run' }));
        acquire(4);

        openHistory();
        fireEvent.click(screen.getByText(PRESET_HISTORY[0].id));
        expect(screen.getByText(/^Replaying/)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Back to current run' }));
        expect(screen.getByText('4 / 4 points')).toBeInTheDocument();
    });

    it('shows a placeholder for the suggestion surface before the first point', () => {
        render(<Case2SolutionPage />, { wrapper: MemoryRouter });
        expect(
            screen.getByText(/appears once the scan has measured its first point/i),
        ).toBeInTheDocument();
        expect(screen.queryByTestId('case-two-solution-contour')).not.toBeInTheDocument();
    });
});
