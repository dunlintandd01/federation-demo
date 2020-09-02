import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AuthGuard } from './auth.guard';
import { LoggingInterceptor } from './logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(5002);
}
bootstrap();
