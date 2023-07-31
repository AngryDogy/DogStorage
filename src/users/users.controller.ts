import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return users.map((user) => {
            const { id, name, password, dogs } = user;
            return { id, name, password, dogs} as UserDto;
          });
    }
    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getUserById(@Param('userId') userId: number) {
        const user =  await this.usersService.getUserById(userId);
        const {id, name, password, dogs} = user[0];
        return {id, name, password, dogs} as UserDto;
    } 

    @UseGuards(JwtAuthGuard)
    @Post()
    async saveUser(@Body() userDto: UserDto) {
        const user = await this.usersService.saveUser(userDto);
        const {id, name, password, dogs} = user;
        return {id, name, password, dogs} as UserDto;
    }
    @UseGuards(JwtAuthGuard)
    @Put(':userId')
    async updateUser(@Param('userId') userId: number, @Body() userDto: UserDto) {
        const user = await this.usersService.updateUser(userId, userDto);
        const {id, name, password, dogs} = user;
        return {id, name, password, dogs} as UserDto;
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: number) {
        this.usersService.deleteUser(userId);
    }
}
