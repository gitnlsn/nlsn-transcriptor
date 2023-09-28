import { basename, dirname, extname, join } from 'path';

interface FormatSegmentationProps {
  filePath: string;

  start: number; // seconds
  length: number; // seconds
}

export const formatSegmentation = ({
  filePath,

  start,
  length,
}: FormatSegmentationProps) => {
  const extension = extname(filePath);
  const filename = basename(filePath, extension);
  const dirPath = dirname(filePath);

  return join(dirPath, `${filename}-${start}-${length}${extension}`);
};
