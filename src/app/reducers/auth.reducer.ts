import { createReducer, on, Action } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  register,
  registerSuccess,
  registerFailure,
  resetAuth,
} from '../actions';
import { Errors } from '../models';

export interface AuthState {
  isSubmitting: boolean;
  errors: Errors;
}

const initialState: AuthState = {
  isSubmitting: false,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(login, register, state => ({
    ...state,
    isSubmitting: true,
    errors: null,
  })),
  on(loginSuccess, registerSuccess, state => ({
    ...state,
    isSubmitting: false,
  })),
  on(loginFailure, registerFailure, (state, { errors }) => ({
    ...state,
    isSubmitting: false,
    errors,
  })),
  on(resetAuth, () => initialState)
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
