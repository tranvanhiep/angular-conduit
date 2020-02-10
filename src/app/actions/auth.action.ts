import { createAction, props } from '@ngrx/store';
import { User, Errors } from '../models';

enum AuthAction {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  ResetAuth = '[Auth] Reset Auth',
}

export const login = createAction(
  AuthAction.Login,
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  AuthAction.LoginSuccess,
  props<{ user: User }>()
);

export const loginFailure = createAction(
  AuthAction.LoginFailure,
  props<{ errors: Errors }>()
);

export const logout = createAction(AuthAction.Logout);

export const logoutSuccess = createAction(AuthAction.LogoutSuccess);

export const register = createAction(
  AuthAction.Register,
  props<{
    username: string;
    email: string;
    password: string;
  }>()
);

export const registerSuccess = createAction(
  AuthAction.RegisterSuccess,
  props<{ user: User }>()
);

export const registerFailure = createAction(
  AuthAction.RegisterFailure,
  props<{ errors: Errors }>()
);

export const resetAuth = createAction(AuthAction.ResetAuth);
