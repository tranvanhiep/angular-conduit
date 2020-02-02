import { Profile, Errors } from '../models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  loadProfile,
  loadProfileSuccess,
  loadProfileFailure,
  resetProfile,
  follow,
  followSuccess,
  unfollow,
  unfollowSuccess,
  followFailure,
  unfollowFailure,
} from '../actions';

export interface ProfileState {
  profile: Profile;
  loading: boolean;
  followRequesting: boolean;
  errors: Errors;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  followRequesting: false,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadProfile, state => ({ ...state, loading: true, errors: null })),
  on(loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    loading: false,
  })),
  on(loadProfileFailure, (state, { errors }) => ({
    ...state,
    errors,
    loading: false,
  })),
  on(follow, unfollow, state => ({
    ...state,
    followRequesting: true,
    errors: null,
  })),
  on(followSuccess, unfollowSuccess, (state, { profile }) => ({
    ...state,
    profile,
    followRequesting: false,
  })),
  on(followFailure, unfollowFailure, (state, { errors }) => ({
    ...state,
    followRequesting: false,
    errors,
  })),
  on(resetProfile, () => initialState)
);

export function profileReducer(
  state: ProfileState | undefined,
  action: Action
) {
  return reducer(state, action);
}
