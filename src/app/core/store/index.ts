import { ActionReducerMap } from '@ngrx/store';
import { authFeaturekey, authReducer, AuthState } from './auth/auth.reducer';
import { coursesFeatureKey, coursesReducer, CoursesState } from './courses/courses.reducer';

export interface RootState {
  [authFeaturekey]: AuthState;
  [coursesFeatureKey]: CoursesState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [authFeaturekey]: authReducer,
  [coursesFeatureKey]: coursesReducer,
};
