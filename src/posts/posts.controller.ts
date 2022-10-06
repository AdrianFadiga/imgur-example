import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostDto } from './dtos/PostDto.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(gif|jpe?g|tiff?|png|bmp|webp)$/i })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Body() { content }: PostDto,
  ) {
    const newPost = await this.postsService.create(content, file);
    return newPost;
  }
}

// npm install --save-dev @types/multer
// @UseInterceptors(FileInterceptor('file'))
// @UploadedFile(new ParseFilePipeBuilder().build()) file: Express.Multer.File,
