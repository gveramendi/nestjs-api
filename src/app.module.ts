import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TodoEntity} from "./todo/entities/todo.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      entities: [TodoEntity],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}
