import { execPromise } from './execPromise';

interface ValidateFileProps {
  filePath: string;
}

export const validateFile = async ({ filePath }: ValidateFileProps) =>
  execPromise(
    `ffprobe -i ${filePath} 2>&1 | grep -Pioq '(Stream).*?(Audio)' && echo -n valid || echo -n invalid`,
  ).then(({ stdout }) => {
    return stdout === 'valid';
  });
