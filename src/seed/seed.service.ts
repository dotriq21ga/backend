import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async onModuleInit() {
        await this.seedUsers();
    }

    async seedUsers() {
        //password : 1
        const users = [
            { name: 'test', userName: 'user test', email: 'test@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 1', userName: 'user test 1', email: 'test1@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 2', userName: 'user test 2', email: 'test2@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 3', userName: 'user test 3', email: 'test3@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 4', userName: 'user test 4', email: 'test4@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 5', userName: 'user test 5', email: 'test5@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 6', userName: 'user test 6', email: 'test6@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 7', userName: 'user test 7', email: 'test7@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 8', userName: 'user test 8', email: 'test8@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
            { name: 'test 9', userName: 'user test 9', email: 'test9@gmail.com', password: '$2a$10$QFFSjlQgmwM0IU2okesUqucRsf/dhEyspHyiw7o0J29L7seB5v6P2' },
        ];
        if (users) {
            const userExits = await this.userRepository.findOne({ where: { name: users[0].name } });
            if (!userExits) {
                const bulkCreateUser = await this.userRepository.create(users);
                return this.userRepository.save(bulkCreateUser);
            }
        }
    }
}