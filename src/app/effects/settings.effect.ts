import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, tap } from 'rxjs/operators';
import {
  updateUserSuccess,
  updateUserFailure,
  updateUser,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from '../actions';
import { of } from 'rxjs';
import { UserService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class SettingsEffect {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap(({ user }) =>
        this.userService.updateCurrentUser(user).pipe(
          map(user => updateUserSuccess({ user })),
          catchError(err => of(updateUserFailure(err)))
        )
      )
    )
  );

  updateUserSucess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserSuccess),
        tap(({ user }) => {
          this.router.navigate(['/profile', user.username]);
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      exhaustMap(() =>
        this.userService.getCurrentUser().pipe(
          map(user => loadUserSuccess({ user })),
          catchError(err => of(loadUserFailure(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
