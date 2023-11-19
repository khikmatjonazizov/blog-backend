import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import { AlreadyExistsException, LoginException } from '../../exceptions';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new LoginException();
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (pwMatches) throw new LoginException();

        const token = await this.signToken(user.id, user.email);
        delete user.hash;

        return {
            token,
            user,
        };
    }

    async signUp(dto: SignUpDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    first_name: dto.first_name,
                    last_name: dto.last_name,
                    hash,
                },
            });
            const token = await this.signToken(user.id, user.email);
            delete user.hash;

            return {
                token,
                user,
            };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new AlreadyExistsException('User');
                }
            }
        }
    }

    signToken(userId: number, email: string): Promise<string> {
        const data = {
            sub: userId,
            email,
        };
        const secret: string = this.config.get('JWT_SECRET');

        return this.jwt.signAsync(data, { secret, expiresIn: '15m' });
    }
}
