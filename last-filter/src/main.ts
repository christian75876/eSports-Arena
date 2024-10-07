import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as Logger, ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './common/filters/error-filter.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 4300;
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(port);
  Logger.log(`App running at http://localhost:${port}`);
}
bootstrap();
