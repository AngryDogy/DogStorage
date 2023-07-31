import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DogsRepository } from './dogs.repository';
import { Dog } from './dogs.entity';
import { DogDto } from './dogs.dto';
import { FindOneOptions } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DogsService {
    constructor (@InjectRepository(Dog) private readonly dogsRepository: DogsRepository) {}

    getAllDogs() {
        return this.dogsRepository.find({
            relations: ['owner']
        });
    }
    getDogById(id: number) {
        return this.dogsRepository.find({
            where: { id },
            relations: ['owner']
        });

    }
    saveDog(dogDto: DogDto) {
        const dog = new Dog();
        dog.name = dogDto.name;
        dog.age = dogDto.age;
        dog.owner = dogDto.owner;
        return this.dogsRepository.save(dog);
    }
    async updateDog(id: number, dogDto: DogDto) {
        const dogs = await this.dogsRepository.find({
            where: {id},
            relations: ['owner']
        });
        const dog = await dogs[0];
        if (!dog) {
            throw new NotFoundException();
        }
        dog.name = dogDto.name;
        dog.age = dogDto.age;
        dog.owner = dogDto.owner;
        return this.dogsRepository.save(dog);
    }
    deleteDog(id: number) {
        this.dogsRepository.delete(id);
    }
} 
