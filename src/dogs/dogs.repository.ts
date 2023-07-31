import { DataSource, Repository } from "typeorm";
import { Dog } from "./dogs.entity";

export class DogsRepository extends Repository<Dog> {
    constructor (private dataSource: DataSource) {
        super(Dog, dataSource.createEntityManager());
    }
}