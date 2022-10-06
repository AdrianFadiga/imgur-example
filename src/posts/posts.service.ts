import { BadRequestException, Injectable } from '@nestjs/common';
import { PostsModel } from './posts.model';
import { ImgurClient } from 'imgur';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PostsService {
  constructor(private postsModel: PostsModel) {}

  async create(content: string, file: Express.Multer.File) {
    console.log(file);
    const imageUrl = await this.uploadImage(file);
    const newPost = await this.postsModel.create(content, imageUrl);
    return newPost;
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const filePath = path.join(
        __dirname,
        '..',
        `../uploads/${file.filename}`,
      );
      const imgurClient = new ImgurClient({
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        refreshToken: 'refreshToken',
      });
      const response = await imgurClient.upload({
        image: fs.createReadStream(filePath) as any,
        type: 'stream',
      });
      fs.unlinkSync(filePath);
      return response.data.link;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}

// npm install imgur
