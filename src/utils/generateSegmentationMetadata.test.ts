import { generateSegmentationMetadata } from './generateSegmentationMetadata';

describe('generateSegmentationMetadata', () => {
  it('should generate metadata', () => {
    const metadata = generateSegmentationMetadata({
      segmentLength: 1,
      totalDuration: 3,
    });

    expect(metadata).toEqual([
      { start: 0, length: 1 },
      { start: 1, length: 1 },
      { start: 2, length: 1 },
    ]);
  });

  it('should generate metadata with lastSegment', () => {
    const metadata = generateSegmentationMetadata({
      segmentLength: 2,
      totalDuration: 3,
    });

    expect(metadata).toEqual([
      { start: 0, length: 2 },
      { start: 2, length: 1 },
    ]);
  });
});
