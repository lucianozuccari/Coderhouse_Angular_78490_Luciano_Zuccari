import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(selectCoursesState, (state) => state.courses);
export const selectCoursesLoading = createSelector(selectCoursesState, (state) => state.loading);
export const selectCoursesError = createSelector(selectCoursesState, (state) => state.error);
