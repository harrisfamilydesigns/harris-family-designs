const METERS_TO_YARDS = 1.09361;
const metersToYards = meters => meters * METERS_TO_YARDS;

export const zoomLevels = [
  {
    zoomLevel: 0,
    metersPerPixel: 156543​,
    yardsPerPixel: metersToYards(156543),
  },
  {
    zoomLevel: 1,
    metersPerPixel: 78272,
    yardsPerPixel: metersToYards(78272),
  },
  {
    zoomLevel: 2,
    metersPerPixel: 39136,
    yardsPerPixel: metersToYards(39136),
  },
  {
    zoomLevel: 3,
    metersPerPixel: 19568,
    yardsPerPixel: metersToYards(19568),
  },
  {
    zoomLevel: 4,
    metersPerPixel: 9784,
    yardsPerPixel: metersToYards(9784),
  },
  {
    zoomLevel: 5,
    metersPerPixel: 4892,
    yardsPerPixel: metersToYards(4892),
  },
  {
    zoomLevel: 6,
    metersPerPixel: 2446,
    yardsPerPixel: metersToYards(2446),
  },
  {
    zoomLevel: 7,
    metersPerPixel: 1223,
    yardsPerPixel: metersToYards(1223),
  },
  {
    zoomLevel: 8,
    metersPerPixel: 611.5,
    yardsPerPixel: metersToYards(611.5),
  },
  {
    zoomLevel: 9,
    metersPerPixel: 305.8,
    yardsPerPixel: metersToYards(305.8),
  },
  {
    zoomLevel: 10,
    metersPerPixel: 152.9,
    yardsPerPixel: metersToYards(152.9),
  },
  {
    zoomLevel: 11,
    metersPerPixel: 76.4,
    yardsPerPixel: metersToYards(76.4),
  },
  {
    zoomLevel: 12,
    metersPerPixel: 38.22,
    yardsPerPixel: metersToYards(38.22),
  },
  {
    zoomLevel: 13,
    metersPerPixel: 19.11,
    yardsPerPixel: metersToYards(19.11),
  },
  {
    zoomLevel: 14,
    metersPerPixel: 9.56,
    yardsPerPixel: metersToYards(9.56),
  },
  {
    zoomLevel: 15,
    metersPerPixel: 4.78,
    yardsPerPixel: metersToYards(4.78),
  },
  {
    zoomLevel: 16,
    metersPerPixel: 2.39,
    yardsPerPixel: metersToYards(2.39),
  },
  {
    zoomLevel: 17,
    metersPerPixel: 1.2,
    yardsPerPixel: metersToYards(1.2),
  },
  {
    zoomLevel: 18,
    metersPerPixel: 0.5972,
    yardsPerPixel: metersToYards(0.5972),
  },
  {
    zoomLevel: 19,
    metersPerPixel: 0.2986,
    yardsPerPixel: metersToYards(0.2986),
  },
  {
    zoomLevel: 20,
    metersPerPixel: 0.1493,
    yardsPerPixel: metersToYards(0.1493),
  },
  {
    zoomLevel: 21,
    metersPerPixel: 0.0746,
    yardsPerPixel: metersToYards(0.0746),
  },
  {
    zoomLevel: 22,
    metersPerPixel: 0.0373,
    yardsPerPixel: metersToYards(0.0373),
  },
  {
    zoomLevel: 23,
    metersPerPixel: 0.0187,
    yardsPerPixel: metersToYards(0.0187),
  },
]
