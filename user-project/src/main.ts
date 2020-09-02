import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { LoggingInterceptor } from './logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(5001);
}
bootstrap();
