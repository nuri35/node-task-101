import { Grade } from './../modules/students/dto/student.dto';
import { GradesAverageCalculate } from './calculate/grades';

interface Calculator<T> {
  calculate(): T;
}

export class SummaryCalculator<T> {
  constructor(public analyzerCal: Calculator<T>) {}

  static staticFromGrades(grade: Grade[]) {
    return new SummaryCalculator(new GradesAverageCalculate(grade));
  }

  buildReport(): T {
    return this.analyzerCal.calculate();
  }
}
