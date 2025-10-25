import { Injectable } from '@angular/core';
import { Student } from './model/Student';
import { mockStudents } from './data/mock';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = mockStudents;
  private studentSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentSubject.asObservable();

  constructor() {
    this.studentSubject.next(this.students);
  }

  getStudents() {
    this.studentSubject.next(this.students);
  }

  getStudent(id: number) {
    return of(this.students.find((student) => student.id === id));
  }

  addStudent(student: Student) {
    const newId = this.students[this.students.length - 1].id + 1;
    student.id = newId;
    this.students.push(student);
    this.studentSubject.next([...this.students]);
  }

  updateStudent(student: Student) {
    const updatedStudents = this.students.map((s) => (s.id === student.id ? student : s));
    this.studentSubject.next(updatedStudents);
    this.students = updatedStudents;
  }

  deleteStudent(id: number) {
    const updatedStudents = this.students.filter((s) => s.id !== id);
    this.studentSubject.next(updatedStudents);
    this.students = updatedStudents;
  }
}