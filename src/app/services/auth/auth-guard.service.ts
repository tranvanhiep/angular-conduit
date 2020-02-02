import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { UserService } from '../user.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(select(this.userService.isAuthenticated)).pipe(
      take(1),
      map(isAuthed => {
        if (!isAuthed) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
