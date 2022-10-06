import { Body, Controller, Post } from '@nestjs/common';
import { PostDto } from './dtos/PostDto.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() { content }: PostDto) {
    const newPost = await this.postsService.create(content);
    return newPost;
  }
}
