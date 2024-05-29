import { Injectable } from '@nestjs/common';
import { MOCK_POST } from 'src/mock/mock-post';

@Injectable()
export class PostService {
  private postList = MOCK_POST;
  findAll() {
    return this.postList;
  }
}
