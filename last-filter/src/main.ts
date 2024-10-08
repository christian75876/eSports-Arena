import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as Logger, ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './common/filters/error-filter.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 4300;
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpErrorFilter());
  const config = new DocumentBuilder()
    .setTitle('eSports Arena')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('play')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`App running at http://localhost:${port}`);
}
bootstrap();
