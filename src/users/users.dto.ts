import { Dog } from "src/dogs/dogs.entity";

export class UserDto {
    id: number;
    name: string;
    password: string;
    dogs: Dog[];
}