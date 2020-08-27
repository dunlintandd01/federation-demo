import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AuthGuard } from './auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());

  await app.listen(5002);
}
bootstrap();
