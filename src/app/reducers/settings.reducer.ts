import { Errors } from '../models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  resetSettings,
} from '../actions';

export interface SettingsState {
  loading: boolean;
  isSubmitting: boolean;
  errors: Errors;
}

const initialState: SettingsState = {
  loading: false,
  isSubmitting: false,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadUser, state => ({ ...state, loading: true, errors: null })),
  on(loadUserSuccess, state => ({ ...state, loading: false })),
  on(loadUserFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    errors,
  })),
  on(updateUser, state => ({ ...state, isSubmitting: true, errors: null })),
  on(updateUserSuccess, state => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateUserFailure, (state, { errors }) => ({
    ...state,
    isSubmitting: false,
    errors,
  })),
  on(resetSettings, () => initialState)
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
