import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(type => User, user => user.dogs)
    @JoinColumn()
    owner : User;
}