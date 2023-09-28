interface GenerateSegmentationMetadataProps {
  totalDuration: number;
  segmentLength: number;
}

interface SegmentationMetadata {
  length: number;
  start: number;
}

export const generateSegmentationMetadata = ({
  segmentLength,
  totalDuration,
}: GenerateSegmentationMetadataProps): SegmentationMetadata[] => {
  const segmentsQuantity = Math.floor(totalDuration / segmentLength);
  const lastSegmentLength = totalDuration % segmentLength;

  const metadataList: SegmentationMetadata[] = Array.from(
    Array(segmentsQuantity).keys(),
  ).map((index) => ({
    start: index * segmentLength,
    length: segmentLength,
  }));

  if (lastSegmentLength !== 0) {
    metadataList.push({
      start: segmentsQuantity * segmentLength,
      length: lastSegmentLength,
    });
  }

  return metadataList;
};
