import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { Student } from './student.entity';
import { StudentRepository } from './students.repository';
import { GradeRepository } from './grade.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentRepository, GradeRepository],
})
export class StudentsModule {}
