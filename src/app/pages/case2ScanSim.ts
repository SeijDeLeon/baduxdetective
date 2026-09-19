/**
 * Simulated adaptive scan used by Case 2. Nothing here talks to a backend: a
 * seeded generator produces the same run every time, so a history entry always
 * replays identically and the live run is reproducible across reloads.
 */

export type ScanSettings = {
    motorX: string;
    motorY: string;
    detector: string;
    xStart: number;
    xStop: number;
    yStart: number;
    yStop: number;
    points: number;
    exposureSeconds: number;
};

export type ScanPoint = {
    index: number;
    x: number;
    y: number;
    intensity: number;
};

export type Suggestion = {
    x: number;
    y: number;
    score: number;
};

export type AcquisitionSurface = {
    x: number[];
    y: number[];
    z: number[][];
    suggestion: Suggestion;
};

export type RunStatus = 'running' | 'complete' | 'aborted';

export type RunRecord = {
    id: string;
    startedAt: string;
    status: RunStatus;
    settings: ScanSettings;
    points: ScanPoint[];
    seed: number;
};

export const MOTOR_CHOICES = [
    'sample_x',
    'sample_y',
    'sample_theta',
    'kb_pitch',
    'focus_z',
] as const;

export const DETECTOR_CHOICES = ['pilatus_2m', 'eiger_1m', 'xspress3', 'merlin'] as const;

export const DEFAULT_SETTINGS: ScanSettings = {
    motorX: 'sample_x',
    motorY: 'sample_y',
    detector: 'pilatus_2m',
    xStart: -2,
    xStop: 2,
    yStart: -2,
    yStop: 2,
    points: 24,
    exposureSeconds: 0.5,
};

export const DETECTOR_SIZE = 30;
export const SURFACE_SIZE = 36;

/** Small deterministic PRNG so a given seed always replays the same run. */
function mulberry32(seed: number) {
    let state = seed >>> 0;
    return function random() {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function clamp(value: number, low: number, high: number) {
    return Math.min(high, Math.max(low, value));
}

function lerp(low: number, high: number, fraction: number) {
    return low + (high - low) * fraction;
}

/**
 * The sample response the optimizer is searching for. The scan never sees this
 * directly — it only ever observes noisy readings of it. Widths are a fraction
 * of the requested range so a wide scan is no harder to converge than a narrow
 * one.
 */
function sampleResponse(x: number, y: number, peak: Suggestion, xSpan: number, ySpan: number) {
    const widthX = (xSpan * 0.2) ** 2;
    const widthY = (ySpan * 0.18) ** 2;
    const main = Math.exp(-((x - peak.x) ** 2 / (2 * widthX) + (y - peak.y) ** 2 / (2 * widthY)));
    // A weaker satellite peak, so the surface is not a single trivial hill.
    const secondary = Math.exp(
        -(
            (x - peak.x + xSpan * 0.34) ** 2 / (3 * widthX) +
            (y - peak.y - ySpan * 0.3) ** 2 / (3 * widthY)
        ),
    );
    return 0.05 + 0.95 * main + 0.28 * secondary;
}

function peakForSeed(settings: ScanSettings, seed: number): Suggestion {
    const random = mulberry32(seed * 7919 + 13);
    return {
        x: lerp(settings.xStart, settings.xStop, 0.25 + random() * 0.5),
        y: lerp(settings.yStart, settings.yStop, 0.25 + random() * 0.5),
        score: 1,
    };
}

/**
 * Builds the whole trajectory up front. A live run reveals it one point at a
 * time, which keeps replaying a history entry and watching a live run identical.
 */
export function buildScanPoints(settings: ScanSettings, seed: number): ScanPoint[] {
    const random = mulberry32(seed);
    const peak = peakForSeed(settings, seed);
    const xSpan = settings.xStop - settings.xStart;
    const ySpan = settings.yStop - settings.yStart;
    const exploreCount = Math.min(5, Math.max(2, Math.round(settings.points * 0.2)));

    const points: ScanPoint[] = [];
    let best: ScanPoint | null = null;

    for (let index = 0; index < settings.points; index++) {
        let x: number;
        let y: number;
        if (index < exploreCount || best === null) {
            x = lerp(settings.xStart, settings.xStop, random());
            y = lerp(settings.yStart, settings.yStop, random());
        } else {
            // Trust region shrinks as the optimizer gains confidence.
            const decay = Math.exp(-index / Math.max(1, settings.points * 0.45));
            x = clamp(
                best.x + (random() * 2 - 1) * xSpan * 0.3 * decay,
                settings.xStart,
                settings.xStop,
            );
            y = clamp(
                best.y + (random() * 2 - 1) * ySpan * 0.3 * decay,
                settings.yStart,
                settings.yStop,
            );
        }

        const intensity = sampleResponse(x, y, peak, xSpan, ySpan) * (1 + (random() - 0.5) * 0.07);
        const point = { index, x, y, intensity };
        points.push(point);
        if (best === null || intensity > best.intensity) best = point;
    }

    return points;
}

/**
 * One detector readout. `tick` only stirs the noise, so the live stream keeps
 * moving between acquisitions without the underlying spot drifting.
 */
export function buildDetectorFrame(
    settings: ScanSettings,
    point: ScanPoint | null,
    tick: number,
): number[][] {
    const random = mulberry32((point ? point.index + 1 : 0) * 104729 + tick * 6151);
    const xFraction = point
        ? (point.x - settings.xStart) / Math.max(1e-6, settings.xStop - settings.xStart)
        : 0.5;
    const yFraction = point
        ? (point.y - settings.yStart) / Math.max(1e-6, settings.yStop - settings.yStart)
        : 0.5;
    const centerColumn = lerp(7, DETECTOR_SIZE - 8, xFraction);
    const centerRow = lerp(7, DETECTOR_SIZE - 8, yFraction);
    const amplitude = point ? 60 + point.intensity * 190 : 20;
    const width = point ? 5.5 + (1 - Math.min(1, point.intensity)) * 5 : 9;

    return Array.from({ length: DETECTOR_SIZE }, (_, row) =>
        Array.from({ length: DETECTOR_SIZE }, (_, column) => {
            const distance =
                (column - centerColumn) ** 2 / (2 * width ** 2) +
                (row - centerRow) ** 2 / (2 * width ** 2);
            const spot = amplitude * Math.exp(-distance);
            const halo = amplitude * 0.16 * Math.exp(-distance / 9);
            const noise = random() * 16;
            return Math.round(clamp(8 + spot + halo + noise, 0, 255));
        }),
    );
}

/**
 * Upper-confidence-bound acquisition surface over the two scanned motors: a
 * kernel-weighted estimate of the readings so far plus an exploration bonus
 * wherever the scan has not looked yet. Its argmax is the suggested next move.
 */
export function buildAcquisitionSurface(
    settings: ScanSettings,
    points: ScanPoint[],
): AcquisitionSurface {
    const xSpan = settings.xStop - settings.xStart;
    const ySpan = settings.yStop - settings.yStart;
    const lengthScale = Math.max(xSpan, ySpan) * 0.16;
    const axisX = Array.from({ length: SURFACE_SIZE }, (_, index) =>
        lerp(settings.xStart, settings.xStop, index / (SURFACE_SIZE - 1)),
    );
    const axisY = Array.from({ length: SURFACE_SIZE }, (_, index) =>
        lerp(settings.yStart, settings.yStop, index / (SURFACE_SIZE - 1)),
    );

    const suggestion: Suggestion = { x: axisX[0], y: axisY[0], score: -Infinity };
    const z = axisY.map((y) =>
        axisX.map((x) => {
            let weightSum = 0;
            let weightedValue = 0;
            for (const point of points) {
                const distance = (x - point.x) ** 2 + (y - point.y) ** 2;
                const weight = Math.exp(-distance / (2 * lengthScale ** 2));
                weightSum += weight;
                weightedValue += weight * point.intensity;
            }
            // Shrinkage rather than a plain weighted mean: without the prior
            // term the estimate saturates at the nearest reading, so empty
            // corners would inherit a high value and always win the argmax.
            const mean = weightedValue / (weightSum + 0.35);
            const uncertainty = 1 / (1 + weightSum);
            // Mostly exploitation: the panel promises the position most likely
            // to read higher, not the most informative one.
            const score = mean + 0.25 * uncertainty;
            if (score > suggestion.score) {
                suggestion.x = x;
                suggestion.y = y;
                suggestion.score = score;
            }
            return score;
        }),
    );

    return { x: axisX, y: axisY, z, suggestion };
}

export function bestPoint(points: ScanPoint[]): ScanPoint | null {
    return points.reduce<ScanPoint | null>(
        (best, point) => (best === null || point.intensity > best.intensity ? point : best),
        null,
    );
}

/** A run id long enough that the history list has to deal with its length. */
export function buildRunId(seed: number) {
    const random = mulberry32(seed * 2654435761);
    const hex = (length: number) =>
        Array.from({ length }, () => Math.floor(random() * 16).toString(16)).join('');
    return `${hex(8)}-${hex(4)}-${hex(4)}-${hex(4)}-${hex(12)}`;
}

const historySeeds = [
    {
        seed: 4117,
        startedAt: '2026-09-16 21:04:38',
        settings: {
            ...DEFAULT_SETTINGS,
            motorX: 'sample_x',
            motorY: 'sample_y',
            detector: 'pilatus_2m',
            points: 32,
            exposureSeconds: 0.5,
        },
        status: 'complete' as RunStatus,
    },
    {
        seed: 9283,
        startedAt: '2026-09-17 02:47:11',
        settings: {
            ...DEFAULT_SETTINGS,
            motorX: 'kb_pitch',
            motorY: 'focus_z',
            detector: 'xspress3',
            xStart: -1.5,
            xStop: 1.5,
            yStart: -3,
            yStop: 3,
            points: 20,
            exposureSeconds: 1.2,
        },
        status: 'complete' as RunStatus,
    },
    {
        seed: 15502,
        startedAt: '2026-09-17 15:22:05',
        settings: {
            ...DEFAULT_SETTINGS,
            motorX: 'sample_theta',
            motorY: 'sample_y',
            detector: 'eiger_1m',
            xStart: -4,
            xStop: 4,
            points: 40,
            exposureSeconds: 0.25,
        },
        status: 'complete' as RunStatus,
    },
    {
        seed: 20881,
        startedAt: '2026-09-18 08:13:52',
        settings: {
            ...DEFAULT_SETTINGS,
            motorX: 'sample_x',
            motorY: 'focus_z',
            detector: 'merlin',
            points: 18,
            exposureSeconds: 0.8,
        },
        status: 'aborted' as RunStatus,
    },
];

export const PRESET_HISTORY: RunRecord[] = historySeeds.map((entry) => {
    const points = buildScanPoints(entry.settings, entry.seed);
    return {
        id: buildRunId(entry.seed),
        startedAt: entry.startedAt,
        status: entry.status,
        settings: entry.settings,
        // An aborted run stopped part way through, so it kept fewer points.
        points:
            entry.status === 'aborted' ? points.slice(0, Math.ceil(points.length * 0.4)) : points,
        seed: entry.seed,
    };
});
