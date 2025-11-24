import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './model/Student';
import { Observable, catchError, of } from 'rxjs';
import { API_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl = `${API_URL}/students`;

  constructor(private http: HttpClient) {}

  // Returns an observable for the full students list
  fetchStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching students:', error);
        return of([]);
      })
    );
  }

  getStudent(id: number): Observable<Student | undefined> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error getting student:', error);
        return of(undefined);
      })
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError((error) => {
        console.error('Error adding student:', error);
        throw error;
      })
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student).pipe(
      catchError((error) => {
        console.error('Error updating student:', error);
        throw error;
      })
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting student:', error);
        throw error;
      })
    );
  }
}
