import { Module } from '@nestjs/common';
import { PrimaryWs } from './primary-ws.gateway';
import { TinyTranscriptorService } from 'src/services/tiny-transcriptor/tiny-transcriptor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrimaryWs, TinyTranscriptorService],
})
export class PrimaryWsModule {}
