import { Module } from '@nestjs/common';
import { PrimaryWsModule } from './modules/primary-ws/primary-ws.module';

@Module({
  imports: [PrimaryWsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
