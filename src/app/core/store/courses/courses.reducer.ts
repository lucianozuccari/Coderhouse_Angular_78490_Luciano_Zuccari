import { createReducer, on } from '@ngrx/store';
import { Course } from '../../services/courses/model/Course';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.loadCourses, (state) => ({ ...state, loading: true, error: null })),
  on(CoursesActions.loadCoursesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    courses: payload,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CoursesActions.addCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CoursesActions.addCourseSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    courses: [...state.courses, payload],
  })),
  on(CoursesActions.addCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(CoursesActions.updateCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CoursesActions.updateCourseSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    courses: state.courses.map((c) => (c.id === payload.id ? payload : c)),
  })),
  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CoursesActions.deleteCourse, (state) => ({ ...state, loading: true, error: null })),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    courses: state.courses.filter((c) => c.id !== id),
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CoursesActions.setCourses, (state, { payload }) => ({ ...state, courses: payload })),
  on(CoursesActions.clearCourses, (state) => ({ ...state, courses: [] }))
);
