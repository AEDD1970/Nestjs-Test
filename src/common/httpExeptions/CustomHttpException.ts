import { HttpException } from '@nestjs/common';
import { getStatus } from './CustomStatus';

export class CustomHttpExceptionValidate extends HttpException {
  constructor(
    method: string,
    endpoint: string,
    message: string | any[],
    property: string,
    status?: number,
  ) {
    const { _status, _message } = getStatus(status);
    super(
      {
        status: _status,
        message: _message,
        method: method,
        endpoint: endpoint,
        errorDescription: 'ValidationException',
        validationErrors: [
          {
            field: property,
            errorMessage: message,
          },
        ],
      } as Record<string, unknown>,
      _status,
    );
  }
}
