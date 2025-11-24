import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsFeatureKey, StudentsState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectAllStudents = createSelector(selectStudentsState, (state) => state.students);
export const selectStudentsLoading = createSelector(selectStudentsState, (state) => state.loading);
export const selectStudentsError = createSelector(selectStudentsState, (state) => state.error);
