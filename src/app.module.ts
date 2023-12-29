import { Module, OnModuleInit, forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/database';
import { UserModule } from './user/user.module';
import { SeedService } from './seed/seed.service';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_JWT } from './config/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    JwtModule.register(CONFIG_JWT),
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
