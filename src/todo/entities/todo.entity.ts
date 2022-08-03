import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar"})
  title: string

  @Column()
  description: string

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date
}
