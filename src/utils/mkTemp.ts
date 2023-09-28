import { execPromise } from './execPromise';

interface MkTempProps {
  ext: string;
  dryRun: boolean;
}

export const mkTemp = async ({ ext, dryRun = false }: MkTempProps) => {
  return await execPromise(
    `mktemp ${dryRun ? '-u' : ''} -t 'XXXXXXXXXX${ext}'`,
  ).then(({ stdout, stderr }) => {
    if (stderr) {
      throw new Error(stderr);
    }

    return stdout.replace('\n', '');
  });
};
