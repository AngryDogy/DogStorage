import { Dog } from "src/dogs/dogs.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(type => Dog, dog => dog.owner)
    @JoinColumn()
    dogs: Dog[];
}