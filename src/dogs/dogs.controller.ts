import { Controller, Get, Put, Body, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogDto } from './dogs.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dogs')
export class DogsController {

    constructor (private dogsService: DogsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllDogs() {
        const dogs = await this.dogsService.getAllDogs();
        return dogs.map((dog) => {
            const {id, name, age, owner} = dog;
            return {id, name, age, owner} as DogDto;
        })
    }
    @UseGuards(JwtAuthGuard)
    @Get(':dogId')
    async getDogById(@Param('dogId') dogId: number) {
        const dog = await this.dogsService.getDogById(dogId);
        const {id, name, age, owner} = dog[0];
        return {id, name, age, owner} as DogDto;
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async saveDog(@Body() dogDto: DogDto) {
        const dog = await this.dogsService.saveDog(dogDto);
        const {id, name, age, owner} = dog;
        return {id, name, age, owner} as DogDto;
    }
    @UseGuards(JwtAuthGuard)
    @Put(':dogId')
    async updateDog(@Param('dogId') dogId: number, @Body() dogDto: DogDto) {
        const dog = await this.dogsService.updateDog(dogId, dogDto);
        const {id, name, age, owner} = dog;
        return {id, name, age, owner} as DogDto;
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':dogId')
    async deleteDog(@Param('dogId') dogId: number) {
        this.dogsService.deleteDog(dogId);
    }
} 
