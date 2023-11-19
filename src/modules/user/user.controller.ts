import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getOneUser(@Param() params: any) {
        return this.userService.getOneUser(params.id);
    }
}
