import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../user.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthResolverService implements Resolve<boolean> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
