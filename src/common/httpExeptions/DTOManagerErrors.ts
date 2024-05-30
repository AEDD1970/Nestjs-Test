import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationException } from './ValidationException';

@Catch(ValidationException, HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(
    exception: ValidationException | HttpException,
    host: ArgumentsHost,
  ): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    const method = request.method;
    const message = exception.message;
    const errorDescription = exception.name;
    const endpoint = request.url;
    let responseErr = {
      status,
      method,
      endpoint,
      message,
      errorDescription,
    };
    if (exception['response']['errorDescription']) {
      responseErr = { ...exception['response'], endpoint };
    }
    if (exception instanceof ValidationException) {
      const validationErrors = exception.validationErrors;
      responseErr['validationErrors'] = validationErrors;
    }
    if (message == 'Too many files') {
      responseErr['validationErrors'] = {
        field: 'file',
        errorMessage:
          'Too many files, only one file is allowed to be uploaded at a time',
      };
      responseErr.status = 422;
      status = 422;
      responseErr.message = 'Unprocessable Entity';
    }
    response.status(status).json(responseErr);
  }
}
