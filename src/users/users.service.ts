import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { UserDto } from './users.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private readonly usersRepository: UsersRepository ) {}
    
    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['dogs']
        });
    }
    getUserById(id: number) {
        return this.usersRepository.find({
            where: {id},
            relations: ['dogs']
        });
       
    }
    getUserByName(name: string) {
        return this.usersRepository.findOne( {
            where: {name},
            relations: ['dogs']
        });
    }
    saveUser(userDto: UserDto) {
        const user = new User();
        user.name = userDto.name;
        user.password = userDto.password;
        user.dogs = userDto.dogs;
        return this.usersRepository.save(user);
    }
    async updateUser(id: number, userDto: UserDto) {
        const option: FindOneOptions<User> = { where: {id} };
        const user = await this.usersRepository.findOne(option);
        if (!user) {
            throw new NotFoundException();
        }
        user.name = userDto.name;
        user.password = userDto.password;
        user.dogs = userDto.dogs;
        return this.usersRepository.save(user);
    }
    deleteUser(id: number) {
        this.usersRepository.delete(id);
    }
}
