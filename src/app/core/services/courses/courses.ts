import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './model/Course';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { API_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  // Service is now a thin HTTP client; store handles state.
  private apiUrl = `${API_URL}/courses`;

  constructor(private http: HttpClient) {
    // Service is now a thin HTTP client; store handles state.
  }

  // Returns an observable for the full courses list
  fetchCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching courses:', error);
        return of([]);
      })
    );
  }

  getCourse(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error getting course:', error);
        return of(undefined);
      })
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError((error) => {
        console.error('Error adding course:', error);
        throw error;
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError((error) => {
        console.error('Error updating course:', error);
        throw error;
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting course:', error);
        throw error;
      })
    );
  }
}
