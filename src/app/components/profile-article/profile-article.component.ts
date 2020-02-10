import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleConfig } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit, OnDestroy {
  profileArticle: ArticleConfig;
  private subscriptions: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscriptions = this.store
      .pipe(
        distinctUntilChanged(
          ({ router: prevRouter }, { router: currRouter }) =>
            prevRouter.state.params.username ===
            currRouter.state.params.username
        ),
        select(state => state.profile)
      )
      .subscribe(({ profile }) => {
        if (profile) {
          const { username } = profile;
          this.profileArticle = {
            type: 'all',
            filters: { author: username },
          };
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
