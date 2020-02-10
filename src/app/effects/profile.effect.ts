import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
  follow,
  followSuccess,
  followFailure,
  unfollow,
  unfollowSuccess,
  unfollowFailure,
} from '../actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { ProfileService } from '../services';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffect {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      exhaustMap(({ username }) =>
        this.profileService.get(username).pipe(
          map(profile => loadProfileSuccess({ profile })),
          catchError(err => of(loadProfileFailure(err)))
        )
      )
    )
  );

  getProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadProfileFailure),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(follow),
      exhaustMap(({ username }) =>
        this.profileService.follow(username).pipe(
          map(profile => followSuccess({ profile })),
          catchError(err => of(followFailure(err)))
        )
      )
    )
  );

  unfollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfollow),
      exhaustMap(({ username }) =>
        this.profileService.unfollow(username).pipe(
          map(profile => unfollowSuccess({ profile })),
          catchError(err => of(unfollowFailure(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router
  ) {}
}
