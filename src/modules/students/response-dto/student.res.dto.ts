import { Type, Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class GradeRes {
  @Expose({ name: 'code' })
  lesson: string;

  @Expose({ name: 'value' })
  point: number;
}

export class StudentResDto {
  @Expose({
    name: 'name',
  })
  stName: string;

  @Expose({
    name: 'surname',
  })
  stSurname: string;

  @Expose()
  stdNumber: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => GradeRes)
  grades: GradeRes[];
}
