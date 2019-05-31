import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models';
import { ProfileService, UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleFollow() {
    this.userService.isAuthenticated
      .pipe(
        concatMap(isAuthed => {
          if (!isAuthed) {
            this.router.navigate(['/login']);
            return of(null);
          }

          if (!this.profile.following) {
            return this.profileService.follow(this.profile.username).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                err => {
                  this.isSubmitting = false;
                }
              )
            );
          } else {
            return this.profileService.unfollow(this.profile.username).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                err => {
                  this.isSubmitting = false;
                }
              )
            );
          }
        })
      )
      .subscribe();
  }
}
