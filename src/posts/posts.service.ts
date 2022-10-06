import { Injectable } from '@nestjs/common';
import { PostsModel } from './posts.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PostsService {
  constructor(private postsModel: PostsModel) {}

  async create(content: string, file: Express.Multer.File) {
    const imageUrl = this.uploadImage(file);
    const newPost = await this.postsModel.create(content);
    return newPost;
  }

  async uploadImage(file: Express.Multer.File) {
    const filePath = path.join(__dirname, '..', `../uploads/${file.filename}`);
    fs.unlinkSync(filePath);
  }
}
