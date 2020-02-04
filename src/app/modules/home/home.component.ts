import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleConfig, Errors } from 'src/app/models';
import { UserService } from 'src/app/services';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { loadTags, loadArticles } from 'src/app/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  config: ArticleConfig = {
    type: 'all',
    filters: {},
  };
  tags: string[];
  tagLoading = false;
  tagsErrors: Errors;
  isAuthenticated = false;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadTags());

    const authSub = this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.setList('feed');
        } else {
          this.setList('all');
        }
      });

    const tagSub = this.store
      .pipe(select(state => state.articleList))
      .subscribe(articleListState => {
        const { tags, tagLoading, tagsErrors } = articleListState;
        this.tags = tags;
        this.tagLoading = tagLoading;
        this.tagsErrors = tagsErrors;
      });

    const sessionSub = this.store
      .pipe(select(state => state.app))
      .subscribe(({ hasSessionError }) => {
        if (hasSessionError) {
          this.store.dispatch(loadArticles({ config: this.config }));
          this.store.dispatch(loadTags());
          sessionSub.unsubscribe();
        }
      });

    this.subscriptions.push(authSub, tagSub, sessionSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setList(type: string, filters: object = {}) {
    this.config = { type, filters };
  }
}
