import { Injectable } from '@nestjs/common';
import { PostsModel } from './posts.model';

@Injectable()
export class PostsService {
  constructor(private postsModel: PostsModel) {}

  async create(content: string) {
    const newPost = await this.postsModel.create(content);
    return newPost;
  }
}
