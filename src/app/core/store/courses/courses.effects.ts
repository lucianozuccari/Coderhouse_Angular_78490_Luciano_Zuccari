import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../services/courses/courses';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { API_URL } from '../../utils/constants';
import { Course } from '../../services/courses/model/Course';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      switchMap(() => {
        console.log('[CoursesEffects] loadCourses action received');
        return this.coursesService.fetchCourses().pipe(
          map((courses) => {
            console.log('[CoursesEffects] fetched courses:', courses && courses.length);
            return CoursesActions.loadCoursesSuccess({ payload: courses });
          }),
          catchError((error) => {
            console.error('[CoursesEffects] fetch error', error);
            return of(
              CoursesActions.loadCoursesFailure({ error: error.message || 'Error loading courses' })
            );
          })
        );
      })
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      switchMap(({ payload }) =>
        this.coursesService.addCourse(payload).pipe(
          map((course) => CoursesActions.addCourseSuccess({ payload: course })),
          catchError((error) =>
            of(CoursesActions.addCourseFailure({ error: error.message || 'Error adding course' }))
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      switchMap(({ payload }) =>
        this.coursesService.updateCourse(payload).pipe(
          map((course) => CoursesActions.updateCourseSuccess({ payload: course })),
          catchError((error) =>
            of(
              CoursesActions.updateCourseFailure({
                error: error.message || 'Error updating course',
              })
            )
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id })),
          catchError((error) =>
            of(
              CoursesActions.deleteCourseFailure({
                error: error.message || 'Error deleting course',
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
