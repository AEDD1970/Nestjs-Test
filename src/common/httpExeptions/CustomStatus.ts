import { HttpStatus } from '@nestjs/common';

export interface IStatusMessage {
  _status: number;
  _message: string;
}

const Status = {
  409: {
    _status: HttpStatus.CONFLICT,
    _message: 'Conflict Request in Jelou',
  },
  404: {
    _status: HttpStatus.NOT_FOUND,
    _message: 'Not Found Request in Jelou',
  },
  401: {
    _status: HttpStatus.UNAUTHORIZED,
    _message: 'Unauthorized Request in Jelou',
  },
  403: {
    _status: HttpStatus.FORBIDDEN,
    _message: 'Forbiden Request in Jelou',
  },
  400: {
    _status: HttpStatus.FORBIDDEN,
    _message: 'Bad Request in Jelou',
  },
  501: {
    _status: HttpStatus.NOT_IMPLEMENTED,
    _message: 'not implement Request in Jelou',
  },
};

export const getStatus = (status: number): IStatusMessage => {
  if (status) {
    return Status[status];
  } else {
    return {
      _status: HttpStatus.BAD_REQUEST,
      _message: 'Bad Request',
    };
  }
};
