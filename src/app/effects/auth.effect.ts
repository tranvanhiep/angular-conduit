import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, map, tap } from 'rxjs/operators';
import { UserService, JwtService } from '../services';
import { of } from 'rxjs';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
  logoutSuccess,
} from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.userService.login({ email, password }).pipe(
          tap(({ token }) => this.jwtService.saveToken(token)),
          map(user => loginSuccess({ user })),
          catchError(err => of(loginFailure(err)))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      exhaustMap(({ username, email, password }) =>
        this.userService.register({ username, email, password }).pipe(
          tap(({ token }) => this.jwtService.saveToken(token)),
          map(user => registerSuccess({ user })),
          catchError(err => of(registerFailure(err)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() =>
        of(logoutSuccess()).pipe(tap(() => this.jwtService.destroyToken()))
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router
  ) {}
}
