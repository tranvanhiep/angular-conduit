import { Action, createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  logoutSuccess,
  sessionLoginSuccess,
  sessionLoginFailure,
  updateUserSuccess,
  loadUserSuccess,
  resetApp,
} from '../actions';
import { User } from '../models';

export interface AppState {
  appName: string;
  appLoaded: boolean;
  currentUser: User;
  hasSessionError: boolean;
}

const initialState: AppState = {
  appName: 'Conduit',
  appLoaded: false,
  currentUser: null,
  hasSessionError: false,
};

const reducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),
  on(
    sessionLoginSuccess,
    updateUserSuccess,
    loadUserSuccess,
    (state, { user }) => ({
      ...state,
      currentUser: user,
    })
  ),
  on(logoutSuccess, state => ({
    ...state,
    currentUser: null,
  })),
  on(sessionLoginFailure, state => ({
    ...state,
    currentUser: null,
    hasSessionError: true,
  })),
  on(resetApp, () => initialState)
);

export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
