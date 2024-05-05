import { IGradesAverageCalculate } from 'src/interfaces/grades.interface';
import { Grade } from 'src/modules/students/dto/student.dto';

export class GradesAverageCalculate {
  constructor(private grades: Grade[]) {}

  calculate(): IGradesAverageCalculate[] {
    const gradeMap = this.grades.reduce((acc, curr) => {
      if (!acc[curr.code]) {
        acc[curr.code] = { sum: curr.value, count: 1 };
      } else {
        acc[curr.code].sum += curr.value;
        acc[curr.code].count++;
      }
      return acc;
    }, {});

    // Ortalamaları hesaplayıp grades dizisini oluşturma
    const grades = Object.keys(gradeMap).map((code) => {
      const sum = gradeMap[code].sum;
      const count = gradeMap[code].count;
      const average = sum / count;
      // Ortalamayı en yakın tam sayıya yuvarla
      const roundedAverage = Math.round(average);
      return { code, value: roundedAverage };
    });

    return grades;
  }
}
