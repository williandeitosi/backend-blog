import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { Post } from '@prisma/client';
import { format } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

type FormattedPost = Omit<Post, 'created_at'> & { created_at: string };

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<Post>> {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.post.count(),
    ]);
    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, author } = createPostDto;
    return this.prisma.post.create({
      data: {
        title,
        content: content.trim(),
        author,
      },
    });
  }

  async findOne(id: string): Promise<FormattedPost> {
    const postExists = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!postExists) {
      throw new NotFoundException('post not found');
    }

    return {
      ...postExists,
      created_at: format(new Date(postExists.created_at), 'dd/MM/yyyy'),
    };
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }

  async editPost(id: string, createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, author } = createPostDto;
    await this.findOne(id);

    return this.prisma.post.update({
      where: { id },
      data: {
        title,
        content: content.trim(),
        author,
      },
    });
  }
}
