import { HttpException, HttpStatus } from '@nestjs/common';

export const throttlerMessage = 'Throttler Exception: Too Many Requests';

export class ThrottlerException extends HttpException {
  constructor(message?: string) {
    super(`${message || throttlerMessage}`, HttpStatus.TOO_MANY_REQUESTS);
  }
}
