import { Grade } from './grade.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { IGradesAverageCalculate } from './../../interfaces/grades.interface';
import { Student } from './student.entity';

@Injectable()
export class GradeRepository extends Repository<Grade> {
  constructor(private dataSource: DataSource) {
    super(Grade, dataSource.createEntityManager());
  }

  async customCreate(
    grade: IGradesAverageCalculate[],
    studentInstance: Student,
    transactionalEntityManager: EntityManager,
  ) {
    //save array of grades to db
    const gradeInstances = grade.map((grade) => {
      const gradeInstance = new Grade();
      gradeInstance.code = grade.code;
      gradeInstance.value = grade.value;
      gradeInstance.student = studentInstance;
      return gradeInstance;
    });
    await transactionalEntityManager.insert(Grade, gradeInstances);
  }
  //use insert metot because for saving array of grades. performance is better than save method
}
