import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PostsController } from './posts.controller';
import { PostsModel } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsModel],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
})
export class PostsModule {}

// npm install @nestjs/platform-express
