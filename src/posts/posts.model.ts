import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsModel {
  constructor(private databaseService: DatabaseService) {}

  async create(content: string, imageUrl: string) {
    const newPost = await this.databaseService.post.create({
      data: {
        content,
        imageUrl,
      },
    });
    return newPost;
  }
}
