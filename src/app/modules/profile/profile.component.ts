import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile, Errors } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { ProfileService } from 'src/app/services';
import { loadProfile, resetProfile } from 'src/app/actions';
import { Subscription } from 'rxjs';
import { take, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Profile;
  isUser = false;
  loading = false;
  errors: Errors;
  followRequesting = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private profileService: ProfileService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    const routerSub = this.store
      .pipe(
        distinctUntilChanged(
          ({ router: prevRouter }, { router: currRouter }) =>
            prevRouter.state.params.username ===
            currRouter.state.params.username
        ),
        select(state => state.router)
      )
      .subscribe(({ state }) => {
        const { username } = state.params;
        this.store.dispatch(loadProfile({ username }));
      });

    const profileSub = this.store
      .pipe(select(this.profileService.userProfile))
      .subscribe(profileState => {
        const {
          isUser,
          profile,
          loading,
          errors,
          followRequesting,
        } = profileState;
        this.isUser = isUser;
        this.loading = loading;
        this.profile = profile;
        this.errors = errors;
        this.followRequesting = followRequesting;
      });

    this.subscriptions.push(routerSub, profileSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(resetProfile());
  }
}
