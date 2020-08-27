import { Injectable } from '@nestjs/common';
import * as R from 'ramda';

const USERS = [
  { id: '123', name: 'pascal' },
  { id: '321', name: 'lin' },
];

@Injectable()
export class UsersService {
  findById(id: string) {
    return R.find((v: any) => v.id === id, USERS);
  }
}
