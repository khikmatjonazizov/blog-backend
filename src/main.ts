import { NestFactory } from '@nestjs/core';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
