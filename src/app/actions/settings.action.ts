import { createAction, props } from '@ngrx/store';
import { User, Errors } from '../models';

enum SettingsAction {
  UpdateUser = '[Settings] Update User',
  UpdateUserSuccess = '[Settings] Update User Success',
  UpdateUserFailure = '[Settings] Update User Failure',
  LoadUser = '[Settings] Load User',
  LoadUserSuccess = '[Settings] Load User Success',
  LoadUserFailure = '[Settings] Load User Failure',
  ResetSettings = '[Settings] Reset Settings',
}

export const updateUser = createAction(
  SettingsAction.UpdateUser,
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  SettingsAction.UpdateUserSuccess,
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  SettingsAction.UpdateUserFailure,
  props<{ errors: Errors }>()
);

export const loadUser = createAction(SettingsAction.LoadUser);

export const loadUserSuccess = createAction(
  SettingsAction.LoadUserSuccess,
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  SettingsAction.LoadUserFailure,
  props<{ errors: Errors }>()
);

export const resetSettings = createAction(SettingsAction.ResetSettings);
