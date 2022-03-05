import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT'), 10),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [join(__dirname, '/entities/*.{ts,js}')],
        migrations: [join(__dirname, '/migrations/*')],
        cli: {
          migrationsDir: 'src/modules/database/migrations',
          entitiesDir: 'src/modules/database/entities',
        },
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([DeliveryTaskRepository, RiderRepository, ViewDeliveryTaskRepository,RiderRepository,CartonRepository, CartonAccessoryRepository, BasketCartonRepository])
  ],
})
export class DatabaseModule {}
