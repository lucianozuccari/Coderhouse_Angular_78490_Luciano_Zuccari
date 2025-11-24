import { createAction, props } from '@ngrx/store';
import { Course } from '../../services/courses/model/Course';

export const loadCourses = createAction('[Courses] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ payload: Course[] }>()
);
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: string }>()
);

export const addCourse = createAction('[Courses] Add Course', props<{ payload: Course }>());
export const addCourseSuccess = createAction(
  '[Courses] Add Course Success',
  props<{ payload: Course }>()
);
export const addCourseFailure = createAction(
  '[Courses] Add Course Failure',
  props<{ error: string }>()
);

export const updateCourse = createAction('[Courses] Update Course', props<{ payload: Course }>());
export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ payload: Course }>()
);
export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);

export const deleteCourse = createAction('[Courses] Delete Course', props<{ id: number }>());
export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);
export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: string }>()
);

// Backwards compatible simple setters
export const setCourses = createAction('[Courses] Set Courses', props<{ payload: Course[] }>());
export const clearCourses = createAction('[Courses] Clear Courses');
