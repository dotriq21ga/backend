import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/database';
import { UserModule } from './user/user.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
  ],
  providers: [SeedService],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) { }

  async onModuleInit() {
    await this.seedService.onModuleInit();
  }
}
