import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Profile } from 'src/app/models';
import { ProfileService } from './profile.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.profileService
      .get(route.params.username)
      .pipe(catchError(err => this.router.navigate(['/'])));
  }
}
