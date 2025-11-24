import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ usernameOrEmail: string; password: string }>()
);

export const loginSuccess = createAction('[Auth] Login Success', props<{ payload: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const checkStoredToken = createAction('[Auth] Check Stored Token');
export const checkStoredTokenSuccess = createAction(
  '[Auth] Check Stored Token Success',
  props<{ payload: any }>()
);
export const checkStoredTokenFailure = createAction('[Auth] Check Stored Token Failure');

export const logout = createAction('[Auth] Logout');

// Backwards-compatible simple setters used in some services/components
export const setAuthUser = createAction('[Auth] Set Auth User', props<{ payload: any }>());
export const clearAuthUser = createAction('[Auth] Clear Auth User');
