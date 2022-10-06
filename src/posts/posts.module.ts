import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsModel } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsModel],
})
export class PostsModule {}
