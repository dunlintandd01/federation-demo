/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Chance from 'chance';

const chance = new Chance();

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.requestId = chance.string({
      length: 8,
      casing: 'upper',
      alpha: true,
      numeric: true,
    });
    return next();
  }
}
