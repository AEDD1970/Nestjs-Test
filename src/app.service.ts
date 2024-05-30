import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInitial(): string {
    return 'Wellcome to doc of Jelou IA in =>  http://localhost:8005/docs';
  }
}
