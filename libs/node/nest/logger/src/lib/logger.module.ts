//import { LoggerModule } from 'nestjs-pino';
import { Module, Logger, Global } from '@nestjs/common';

@Global()
@Module({
  // imports: [LoggerModule.forRoot({})],
  exports: [Logger],
  providers: [Logger],
})
export class LoggerModule {}
