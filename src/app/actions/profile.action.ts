import { createAction, props } from '@ngrx/store';
import { Profile, Errors } from '../models';

enum ProfileAction {
  LoadProfile = '[Profile] Load Profile',
  LoadProfileSuccess = '[Profile] Load Profile Success',
  LoadProfileFailure = '[Profile] Load Profile Failure',
  Follow = '[Profile] Follow',
  FollowSuccess = '[Profile] Follow Success',
  FollowFailure = '[Profile] Follow Failure',
  Unfollow = '[Profile] Unfollow',
  UnfollowSuccess = '[Profile] Unfollow Success',
  UnfollowFailure = '[Profile] Unfollow Failure',
  ResetProfile = '[Profile] Reset Profile',
}

export const loadProfile = createAction(
  ProfileAction.LoadProfile,
  props<{ username: string }>()
);

export const loadProfileSuccess = createAction(
  ProfileAction.LoadProfileSuccess,
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  ProfileAction.LoadProfileFailure,
  props<{ errors: Errors }>()
);

export const follow = createAction(
  ProfileAction.Follow,
  props<{ username: string }>()
);

export const followSuccess = createAction(
  ProfileAction.FollowSuccess,
  props<{ profile: Profile }>()
);

export const followFailure = createAction(
  ProfileAction.FollowFailure,
  props<{ errors: Errors }>()
);

export const unfollow = createAction(
  ProfileAction.Unfollow,
  props<{ username: string }>()
);

export const unfollowSuccess = createAction(
  ProfileAction.UnfollowSuccess,
  props<{ profile: Profile }>()
);

export const unfollowFailure = createAction(
  ProfileAction.UnfollowFailure,
  props<{ errors: Errors }>()
);

export const resetProfile = createAction(ProfileAction.ResetProfile);
