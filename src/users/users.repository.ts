import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
export class UsersRepository extends Repository<User> {

    constructor (private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }


}