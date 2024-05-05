import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from './grade.entity';
// import { StudentRepository } from './students.repository';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  stdNumber: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
