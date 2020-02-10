import { createAction, props } from '@ngrx/store';
import { User } from '../models';

enum AppAction {
  SessionLogin = '[App] Session Login',
  SessionLoginSuccess = '[App] Session Login Success',
  SessionLoginFailure = '[App] Session Login Failure',
  ResetApp = '[App] Reset App',
}

export const sessionLogin = createAction(AppAction.SessionLogin);

export const sessionLoginSuccess = createAction(
  AppAction.SessionLoginSuccess,
  props<{ user: User }>()
);

export const sessionLoginFailure = createAction(AppAction.SessionLoginFailure);

export const resetApp = createAction(AppAction.ResetApp);
