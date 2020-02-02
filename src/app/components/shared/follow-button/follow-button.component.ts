import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/models';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import {
  follow,
  unfollow,
  followArticle,
  unfollowArticle,
} from 'src/app/actions';
import { take, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() profile: Profile;
  @Input() isSubmitting = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {}

  toggleFollow() {
    this.store
      .pipe(
        select(this.userService.isAuthenticated),
        take(1),
        exhaustMap(isAuthed => {
          if (!isAuthed) {
            this.router.navigate(['/login']);
          }
          return this.store.pipe(select(state => state.router));
        })
      )
      .subscribe(({ state }) => {
        const { username } = this.profile;

        if (/\/profile\//.test(state.url)) {
          if (!this.profile.following) {
            this.store.dispatch(follow({ username }));
          } else {
            this.store.dispatch(unfollow({ username }));
          }
        } else {
          if (!this.profile.following) {
            this.store.dispatch(followArticle({ username }));
          } else {
            this.store.dispatch(unfollowArticle({ username }));
          }
        }
      });
  }
}
