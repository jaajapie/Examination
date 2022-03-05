import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import databasePostgresConfig from './configs/database-postgres.config';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [databasePostgresConfig],
      isGlobal: true,
    }),

    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
