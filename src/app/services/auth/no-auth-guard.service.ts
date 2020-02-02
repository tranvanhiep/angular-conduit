import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardService {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(this.userService.isAuthenticated),
      take(1),
      map(isAuthed => {
        if (isAuthed) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
