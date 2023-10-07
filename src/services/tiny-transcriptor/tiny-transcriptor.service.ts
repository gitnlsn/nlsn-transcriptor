import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { mkTemp } from '../../utils/mkTemp';
import { validateFile } from '../../utils/validateFile';
import { convertWav } from '../../utils/convertWav';
import { transcribe } from 'src/utils/transcribe';
import { execPromise } from 'src/utils/execPromise';

@Injectable()
export class TinyTranscriptorService {
  async transcribe(buffer: Buffer) {
    const tempFile = await mkTemp({
      dryRun: true,
      ext: '.opus',
    });

    const tempWavFile = await mkTemp({
      dryRun: true,
      ext: '.wav',
    });

    writeFileSync(tempFile, buffer);

    await validateFile({ filePath: tempFile });

    await convertWav({
      filePath: tempFile,
      outfilePath: tempWavFile,
    });

    const { transcription } = await transcribe({
      filePath: tempWavFile,
      modelPath: './whisper-cpp/ggml-base.bin',
    });

    await execPromise(`rm ${tempFile} ${tempWavFile}`);

    return transcription;
  }
}
