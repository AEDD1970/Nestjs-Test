import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { configureSwagger } from './config/swagger/swagger';
import { useContainer } from 'class-validator';
import { CORS } from './common/cors/cors';
import { ValidationFilter } from './common/httpExeptions/DTOManagerErrors';
import {
  IErrorDTO,
  ValidationException,
} from './common/httpExeptions/ValidationException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  configureSwagger(app);
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result: IErrorDTO[] = errors.map((error) => ({
          field: error.property,
          errorMessage: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new ValidationException(result);
      },
      stopAtFirstError: false,
      whitelist: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`⚡📱 Application running on port ${port} ...`);
}
bootstrap();
