import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TinyTranscriptorService } from 'src/services/tiny-transcriptor/tiny-transcriptor.service';
import { TranscriptorSocketIo } from 'transcriptor-client';

@WebSocketGateway()
export class PrimaryWs implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: TranscriptorSocketIo;

  constructor(private tinyTranscriptorService: TinyTranscriptorService) {}

  handleConnection() {
    this.server.emit('ping', 'client connected');
  }

  handleDisconnect() {
    this.server.emit('ping', 'client disconnected');
  }

  @SubscribeMessage('ping')
  handlePing(client: TranscriptorSocketIo, data: string): string {
    console.log('ping', { data });
    client.emit('ping', { data });
    return data;
  }

  @SubscribeMessage('pong')
  handlePong(client: TranscriptorSocketIo, data: string): string {
    console.log('pong', { data });
    return data;
  }

  @SubscribeMessage('transcribe')
  async handleTranscribe(
    client: TranscriptorSocketIo,
    data: ReturnType<Uint8Array['toString']>,
  ): Promise<string> {
    if (data.length > 1024000) {
      client.emit('transcription', {
        status: 'exceeded-file-size',
        speeches: [],
      });
      return;
    }

    try {
      const buffer = Buffer.from(JSON.parse(`[${data}]`));

      const transcription =
        await this.tinyTranscriptorService.transcribe(buffer);

      client.emit('transcription', {
        status: 'transcribed',
        speeches: transcription,
      });
      return;
    } catch (error) {
      console.error(error);
      client.emit('transcription', {
        status: 'internal-server-error',
        speeches: [],
      });
      return;
    }
  }
}
