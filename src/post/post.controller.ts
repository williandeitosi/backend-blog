import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/posts')
  async findAll() {
    return await this.postService.findAll();
  }
  @Get('/posts/:id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  @Post('/post')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }
}
