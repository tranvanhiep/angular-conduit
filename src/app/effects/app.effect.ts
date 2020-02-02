import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  sessionLogin,
  sessionLoginSuccess,
  sessionLoginFailure,
} from '../actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { UserService, JwtService } from '../services';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AppEffect {
  currentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionLogin),
      exhaustMap(() =>
        this.userService.getCurrentUser().pipe(
          map(user => sessionLoginSuccess({ user })),
          catchError(err => of(sessionLoginFailure()))
        )
      )
    )
  );

  sessionLoginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sessionLoginFailure),
        tap(() => {
          this.jwtService.destroyToken();
          this.router.navigate(['/']);
        })
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
