import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
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
