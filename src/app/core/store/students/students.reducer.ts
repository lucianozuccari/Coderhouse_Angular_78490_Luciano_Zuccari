import { createReducer, on } from '@ngrx/store';
import { Student } from '../../services/students/model/Student';
import * as StudentsActions from './students.actions';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export const initialStudentsState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

export const studentsReducer = createReducer(
  initialStudentsState,
  on(StudentsActions.loadStudents, (state) => ({ ...state, loading: true, error: null })),
  on(StudentsActions.loadStudentsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    students: payload,
  })),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StudentsActions.addStudent, (state) => ({ ...state, loading: true, error: null })),
  on(StudentsActions.addStudentSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    students: [...state.students, payload],
  })),
  on(StudentsActions.addStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StudentsActions.updateStudent, (state) => ({ ...state, loading: true, error: null })),
  on(StudentsActions.updateStudentSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    students: state.students.map((s) => (s.id === payload.id ? payload : s)),
  })),
  on(StudentsActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StudentsActions.deleteStudent, (state) => ({ ...state, loading: true, error: null })),
  on(StudentsActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    students: state.students.filter((s) => s.id !== id),
  })),
  on(StudentsActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StudentsActions.setStudents, (state, { payload }) => ({ ...state, students: payload })),
  on(StudentsActions.clearStudents, (state) => ({ ...state, students: [] }))
);
