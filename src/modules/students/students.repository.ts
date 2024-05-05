import { Student } from './student.entity';
import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async customCreate(
    studentDto: StudentDto,
    transactionalEntityManager: EntityManager,
  ) {
    const { name, surname, stdNumber } = studentDto;
    const studentVal = new Student();
    studentVal.name = name;
    studentVal.surname = surname;
    studentVal.stdNumber = stdNumber;
    return await transactionalEntityManager.save(studentVal);
  }
}
