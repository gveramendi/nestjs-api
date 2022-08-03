import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { TodoRepository } from "../repositories/todo.repository";
import { TodoEntity } from "../entities/todo.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
      @InjectRepository(TodoEntity)
      private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save(createTodoDto);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneBy({id});
    if (!todo) {
      this.logger.error(`Todo with id: ${id} does not exists.`);
      throw new NotFoundException(`Todo with id: ${id} not found.`);
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({id});
    const { title, description } = updateTodoDto;

    todo.title = title;
    todo.description = description;

    try {
      const updatedTodo = await this.todoRepository.save(todo);
      this.logger.log(`Todo with id: ${updatedTodo.id} was update.`);

      return await this.findOne(updatedTodo.id);
    } catch (err) {
      throw new BadRequestException('Invalid update todo.');
    }
  }

  async remove(id: number) {
    const todo = await this.findOne(id);

    const result = await this.todoRepository.delete(todo.id);
    this.logger.log(`Todo with id: ${todo.id} was delete.`);

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with id: "${id}" not found.`);
    }
  }
}
