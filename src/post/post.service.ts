import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allPosts = await this.prisma.post.findMany();
    return allPosts;
  }

  async createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        author: createPostDto.author,
      },
    });
  }

  async findOne(id: string) {
    const postExists = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postExists) {
      throw new Error('the post is not found');
    }

    return postExists;
  }
}
