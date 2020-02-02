import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile, Errors } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { ProfileService } from 'src/app/services';
import { loadProfile, resetProfile } from 'src/app/actions';
import { Subscription } from 'rxjs';

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
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    const routeSub = this.route.params.subscribe(params => {
      const { username } = params;
      this.store.dispatch(loadProfile({ username }));
    });

    const profileSub = this.store
      .pipe(select(this.profileService.userProfile))
      .subscribe(({ isUser, profile, loading, errors, followRequesting }) => {
        this.isUser = isUser;
        this.loading = loading;
        this.profile = profile;
        this.errors = errors;
        this.followRequesting = followRequesting;
      });

    this.subscriptions.push(routeSub, profileSub);
  }

  ngOnDestroy() {
    this.store.dispatch(resetProfile());
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
