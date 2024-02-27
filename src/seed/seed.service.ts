import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        private userService: UserService
    ) { }

    async onModuleInit() {
        await this.seedData();
    }

    async seedData() {
        await this.userService.seedUsers();
    }
}