import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { typeStatusMessage } from '../entities/task-list.entity';

export class CreateTaskListDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Write to doc of accounting',
  })
  @IsString()
  @MinLength(6, { message: 'The title must have at least 6 characters' })
  @MaxLength(150, { message: 'The  title the 100 character limit' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Message of the task',
    example: 'send reports to all our employees',
    required: false,
  })
  @IsString()
  @MinLength(6, { message: 'The message must have at least 6 characters' })
  @MaxLength(350, { message: 'The  message the 350 character limit' })
  @IsOptional()
  message?: string;

  @ApiProperty({
    description: 'Message assign to Juan',
    example: 'Juan Duque',
    required: false,
  })
  @IsString()
  @MinLength(6, { message: 'The assign to must have at least 6 characters' })
  @MaxLength(150, { message: 'The  assign to the 150 character limit' })
  @IsNotEmpty()
  @IsNotEmpty()
  assign_to: string;

  @ApiProperty({
    description: 'Status of the task',
    example: 'PENDING',
    enum: typeStatusMessage,
  })
  @IsEnum(typeStatusMessage)
  status_type_message: typeStatusMessage;
}

export class UuidDto {
  @ApiProperty({
    example: 'a6f44361-2779-44f5-bd49-fff12d6d31cc',
    required: true,
  })
  @IsString()
  id: string;
}
