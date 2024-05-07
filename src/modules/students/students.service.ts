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
    try {
      //***NOT: */ Due to the requirement of having only one endpoint within the service, if there is no student, it saves and continues; if there is a student, it continues without saving under the relevant student number. Then, before saving the grades, if there are multiple instances of the same course code in the 'grades' array provided as 'grades', it calculates the average and saves the average grade. In doing so, I leverage object composition best practices. Then, I associate it with the student and save it to the 'grades' table. You can delve into this further for a detailed examination.
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          let studentInstance: Student;
          const studentExist = await transactionalEntityManager.findOne(
            this.studentRepo.target,
            {
              select: {
                id: true,
                name: true,
                surname: true,
                stdNumber: true,
                grades: {
                  id: true,
                  value: true,
                  code: true,
                },
              },
              relations: {
                grades: true,
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
          //When multiple entries exist for a single course, the API should calculate and store the average grade for that course.
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

          return studentInstance; // please look at students.controller for searialization interceptor.
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
