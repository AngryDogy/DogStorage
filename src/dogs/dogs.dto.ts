import { IsAlphanumeric, IsPositive, Max } from "class-validator";
import { User } from "src/users/users.entity";

export class DogDto {
    id: number;
    @IsAlphanumeric()
    name: string;
    @IsPositive()
    @Max(40)
    age: number;
    owner: User;
}