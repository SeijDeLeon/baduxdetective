export const heatmapSlices = Array.from({ length: 3 }, (_, slice) =>
    Array.from({ length: 22 }, (_, row) =>
        Array.from({ length: 30 }, (_, column) => {
            const peakX = 7 + slice * 7;
            const peakY = 7 + slice * 3;
            const distance =
                ((column - peakX) * (column - peakX)) / 38 + ((row - peakY) * (row - peakY)) / 24;
            const secondaryDistance =
                ((column - (24 - slice * 4)) * (column - (24 - slice * 4))) / 22 +
                ((row - (16 - slice * 3)) * (row - (16 - slice * 3))) / 18;
            return Math.round(
                Math.min(255, 18 + 225 * Math.exp(-distance) + 105 * Math.exp(-secondaryDistance)),
            );
        }),
    ),
);
