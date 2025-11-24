import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../../services/students/students';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as StudentsActions from './students.actions';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      switchMap(() => {
        console.log('[StudentsEffects] loadStudents action received');
        return this.studentsService.fetchStudents().pipe(
          map((students) => {
            console.log('[StudentsEffects] fetched students:', students && students.length);
            return StudentsActions.loadStudentsSuccess({ payload: students });
          }),
          catchError((error) => {
            console.error('[StudentsEffects] fetch error', error);
            return of(
              StudentsActions.loadStudentsFailure({
                error: error.message || 'Error loading students',
              })
            );
          })
        );
      })
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.addStudent),
      switchMap(({ payload }) =>
        this.studentsService.addStudent(payload).pipe(
          map((student) => StudentsActions.addStudentSuccess({ payload: student })),
          catchError((error) =>
            of(
              StudentsActions.addStudentFailure({ error: error.message || 'Error adding student' })
            )
          )
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      switchMap(({ payload }) =>
        this.studentsService.updateStudent(payload).pipe(
          map((student) => StudentsActions.updateStudentSuccess({ payload: student })),
          catchError((error) =>
            of(
              StudentsActions.updateStudentFailure({
                error: error.message || 'Error updating student',
              })
            )
          )
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      switchMap(({ id }) =>
        this.studentsService.deleteStudent(id).pipe(
          map(() => StudentsActions.deleteStudentSuccess({ id })),
          catchError((error) =>
            of(
              StudentsActions.deleteStudentFailure({
                error: error.message || 'Error deleting student',
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private studentsService: StudentsService) {}
}
