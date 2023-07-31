import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsRepository } from './dogs.repository';
import { Dog } from './dogs.entity';
import { DogDto } from './dogs.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, DogsRepository])],
  providers: [DogsService],
  controllers: [DogsController]
})
export class DogsModule {}
