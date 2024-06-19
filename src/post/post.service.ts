import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allPosts = await this.prisma.post.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return allPosts;
  }

  async createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content.trim(),
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

    return {
      ...postExists,
      created_at: format(new Date(postExists.created_at), 'dd/MM/yyyy'),
    };
  }

  async delete(id: string) {
    const postExists = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postExists) {
      throw new Error('the post is not found');
    }

    return this.prisma.post.delete({ where: { id } });
  }
}
