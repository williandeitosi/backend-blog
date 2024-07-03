import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/Is-public.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @IsPublic()
  @Get()
  async findAll() {
    return await this.postService.findAll();
  }
  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }

  @Put(':id')
  async editPost(
    @Param('id') id: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.editPost(id, createPostDto);
  }
}
