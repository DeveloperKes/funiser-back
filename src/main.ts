import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  try {
    console.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`App running on port ${PORT}`);
  } catch (error) {
    console.error('Error during application initialization:', error);
  }
}

bootstrap();
