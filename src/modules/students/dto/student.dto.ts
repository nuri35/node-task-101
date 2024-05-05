import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class Grade {
  @IsString()
  code: string;

  @IsInt()
  @Min(0)
  @Max(100)
  value: number;
}

export class StudentDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @Length(10, 12)
  stdNumber: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => Grade)
  grades: Grade[];
}
