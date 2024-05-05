import { Controller, Post, Body } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentsService } from './students.service';

@Controller('/students')
// @Serialize(UserDto)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() studentDto: StudentDto) {
    return this.studentsService.create(studentDto);
  }
}
