import { createReducer, on } from '@ngrx/store';
import {
  clearAuthUser,
  setAuthUser,
  loginSuccess,
  checkStoredTokenSuccess,
  logout,
} from './auth.actions';

export const authFeaturekey = 'auth';

export interface AuthState {
  user: any;
}

export const initialAuthState: AuthState = {
  user: null,
};

export const authReducer = createReducer<AuthState>(
  initialAuthState,
  on(setAuthUser, (state, { payload }) => ({ ...state, user: payload })),
  on(loginSuccess, (state, { payload }) => ({ ...state, user: payload })),
  on(checkStoredTokenSuccess, (state, { payload }) => ({ ...state, user: payload })),
  on(clearAuthUser, (state) => ({ ...state, user: null })),
  on(logout, (state) => ({ ...state, user: null }))
);
