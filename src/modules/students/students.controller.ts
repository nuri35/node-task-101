import { Controller, Post, Body } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentsService } from './students.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentResDto } from './response-dto/student.res.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('nestjs')
@Controller('/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Serialize(StudentResDto)
  @ApiResponse({
    status: 201,
    description: 'Successfully operation',
  })
  create(@Body() studentDto: StudentDto) {
    return this.studentsService.create(studentDto);
  }
}
