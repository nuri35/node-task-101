import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentRepository } from './students.repository';
import { SummaryCalculator } from 'src/object-composition/index';
import { DataSource } from 'typeorm';
import { GradeRepository } from './grade.repository';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly gradeRepo: GradeRepository,
    private dataSource: DataSource,
  ) {}

  async create(studentDto: StudentDto) {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        let studentInstance: Student;
        const studentExist = await transactionalEntityManager.findOne(
          this.studentRepo.target,
          {
            select: {
              id: true,
            },
            where: { stdNumber: studentDto.stdNumber },
          },
        );
        if (!studentExist) {
          const studentInstanceValue = await this.studentRepo.customCreate(
            studentDto,
            transactionalEntityManager,
          );
          studentInstance = studentInstanceValue;
        } else {
          studentInstance = studentExist;
        }
        //object compositon solid principle for reusable coding
        const updatedGrades = SummaryCalculator.staticFromGrades(
          studentDto.grades,
        ).buildReport();
        //grades calculate process ok

        // add grades to db

        await this.gradeRepo.customCreate(
          updatedGrades,
          studentInstance,
          transactionalEntityManager,
        );

        return updatedGrades;
      },
    );
  }
}
