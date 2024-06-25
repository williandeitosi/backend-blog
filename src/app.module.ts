import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
