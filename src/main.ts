import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // extra fields hata dega
    forbidNonWhitelisted: true,  // unknown fields = error
    transform: true,       // string ko enum/number me convert karega
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
