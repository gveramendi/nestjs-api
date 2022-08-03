import {IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  title: string

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  description: string
}
