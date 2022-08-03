import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoRepository } from "./repositories/todo.repository";
import {TodoEntity} from "./entities/todo.entity";

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    TypeOrmModule.forFeature([TodoEntity])
  ],
})
export class TodoModule {}
