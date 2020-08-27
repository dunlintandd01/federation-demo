import { Injectable } from '@nestjs/common';
import * as R from 'ramda';

const POST_LIST = [
  {
    id: '1',
    title: "pascal's post",
    body: 'test',
    userId: '123',
  },
  {
    id: '2',
    title: "lin's post",
    body: 'test',
    userId: '321',
  },
];

@Injectable()
export class PostsService {
  findAll() {
    return POST_LIST;
  }
  findByUserId(userId: string) {
    return R.filter(R.propEq('userId', userId))(POST_LIST);
  }
  findOne(postId: string) {
    return R.find(R.propEq('id', postId))(POST_LIST);
  }
}
