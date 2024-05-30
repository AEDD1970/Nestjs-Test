import { IsBoolean } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

export enum typeStatusMessage {
  PENDING = 'PENDING',
  PROGRESS = 'PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity('task_list')
export class TaskList extends BaseEntity {
  @Column({ nullable: false, length: 150 })
  title: string;

  @Column({ nullable: true, length: 350 })
  message?: string;

  @Column({ nullable: false, length: 150 })
  assign_to: string;

  @Column({
    type: 'enum',
    enum: typeStatusMessage,
  })
  status_type_message: typeStatusMessage;

  @Column({ nullable: true, default: true })
  @IsBoolean()
  active: boolean;
}
