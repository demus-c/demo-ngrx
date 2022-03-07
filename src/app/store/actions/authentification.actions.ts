import {createAction, props} from '@ngrx/store';

 enum AuthenticationActionTypes {
  LOGIN = '[Authentication] Login',
  LOGIN_SUCCESS = '[Authentication] Login Success',
  LOGIN_FAILURE = '[Authentication] Login Failure',
  LOGOUT = '[Authentication] Logout',
}

export const loginSuccess = createAction(AuthenticationActionTypes.LOGIN_SUCCESS, props<{ payload: any }>());
export const login = createAction(AuthenticationActionTypes.LOGIN,props<{payload: any}>());
export const loginFailure = createAction(AuthenticationActionTypes.LOGIN_FAILURE,props<{ error: any }>());
export const logout = createAction(AuthenticationActionTypes.LOGOUT);
