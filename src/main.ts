import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {TodoService} from "./todo/services/todo.service";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = +process.env.APP_PORT || 3000
  const globalPrefix = process.env.APP_GLOBAL_PREFIX || 'api'
  const app = await NestFactory.create(AppModule);
  const documentBuilder = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('NestJS API documentation.')
      .setVersion('1.0')
      .addTag('nestjs')
      .build();
  const document = SwaggerModule.createDocument(app, documentBuilder)
  SwaggerModule.setup('swagger', app, document)

  // app.setGlobalPrefix(globalPrefix)
  app.enableCors()

  logger.log('Port running on: ', port)
  await app.listen(port);
}
bootstrap();
