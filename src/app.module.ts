import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IssuesModule } from './issues/issues.module';
import { Issue } from './issues/issue.entity';
import { ActivityLog } from './activity/activity.entity';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database configuration using env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_URL') || 'database.sqlite',
        entities: [Issue, ActivityLog],
        synchronize: true,
      }),
    }),

    IssuesModule,
  ],
})
export class AppModule {}
