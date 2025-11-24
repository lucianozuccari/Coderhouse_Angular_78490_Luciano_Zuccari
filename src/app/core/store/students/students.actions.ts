import { createAction, props } from '@ngrx/store';
import { Student } from '../../services/students/model/Student';

export const loadStudents = createAction('[Students] Load Students');
export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ payload: Student[] }>()
);
export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: string }>()
);

export const addStudent = createAction('[Students] Add Student', props<{ payload: Student }>());
export const addStudentSuccess = createAction(
  '[Students] Add Student Success',
  props<{ payload: Student }>()
);
export const addStudentFailure = createAction(
  '[Students] Add Student Failure',
  props<{ error: string }>()
);

export const updateStudent = createAction(
  '[Students] Update Student',
  props<{ payload: Student }>()
);
export const updateStudentSuccess = createAction(
  '[Students] Update Student Success',
  props<{ payload: Student }>()
);
export const updateStudentFailure = createAction(
  '[Students] Update Student Failure',
  props<{ error: string }>()
);

export const deleteStudent = createAction('[Students] Delete Student', props<{ id: number }>());
export const deleteStudentSuccess = createAction(
  '[Students] Delete Student Success',
  props<{ id: number }>()
);
export const deleteStudentFailure = createAction(
  '[Students] Delete Student Failure',
  props<{ error: string }>()
);

// Backwards compatible simple setters
export const setStudents = createAction('[Students] Set Students', props<{ payload: Student[] }>());
export const clearStudents = createAction('[Students] Clear Students');
