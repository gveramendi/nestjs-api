import { EntityRepository, Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {
  async createTodo(
    createTodoDto: CreateTodoDto
  ): Promise<TodoEntity> {
    const { title, description } = createTodoDto;
    const todo = new TodoEntity();

    todo.title = title;
    todo.description = description;

    await todo.save();
    return todo;
  }
}