import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { User } from 'src/user/entities/user.entity.js';
import { Role } from 'src/role/entities/role.entity.js';
import { UserRole } from 'src/role/entities/user-role.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_USER_PASSWORD'),
        database: configService.get('DATABASE_NAwME'),
        logging: console.log,
        autoLoadModels: true,
        models: [],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
