import { Test, TestingModule } from '@nestjs/testing';
import { TinyTranscriptorService } from './tiny-transcriptor.service';

describe('TinyTranscriptorService', () => {
  let service: TinyTranscriptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TinyTranscriptorService],
    }).compile();

    service = module.get<TinyTranscriptorService>(TinyTranscriptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
