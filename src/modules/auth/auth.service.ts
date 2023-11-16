import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(dto: SignInDto) {
    return dto;
  }

  async signUp(dto: SignUpDto) {
    return dto;
  }
}
