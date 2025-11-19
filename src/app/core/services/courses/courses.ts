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
  private courseSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.courseSubject.asObservable();
  private apiUrl = `${API_URL}/courses`;

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  private loadCourses() {
    this.http
      .get<Course[]>(this.apiUrl)
      .pipe(
        tap((courses) => {
          this.courses = courses;
          this.courseSubject.next(courses);
        }),
        catchError((error) => {
          console.error('Error loading courses:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  getCourses() {
    this.http
      .get<Course[]>(this.apiUrl)
      .pipe(
        tap((courses) => {
          this.courses = courses;
          this.courseSubject.next(courses);
        }),
        catchError((error) => {
          console.error('Error getting courses:', error);
          return of([]);
        })
      )
      .subscribe();
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
      tap((newCourse) => {
        this.courses.push(newCourse);
        this.courseSubject.next([...this.courses]);
      }),
      catchError((error) => {
        console.error('Error adding course:', error);
        throw error;
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      tap((updatedCourse) => {
        const updatedCourses = this.courses.map((c) =>
          c.id === updatedCourse.id ? updatedCourse : c
        );
        this.courses = updatedCourses;
        this.courseSubject.next(updatedCourses);
      }),
      catchError((error) => {
        console.error('Error updating course:', error);
        throw error;
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedCourses = this.courses.filter((c) => c.id !== id);
        this.courses = updatedCourses;
        this.courseSubject.next(updatedCourses);
      }),
      catchError((error) => {
        console.error('Error deleting course:', error);
        throw error;
      })
    );
  }
}
