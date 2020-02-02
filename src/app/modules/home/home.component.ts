import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleConfig } from 'src/app/models';
import { UserService } from 'src/app/services';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Subscription } from 'rxjs';
import { loadTags } from 'src/app/actions';
import { ActivatedRoute } from '@angular/router';

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
  tags: string[] = [];
  tagLoading = false;
  isAuthenticated = false;
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTags());

    const authSub = this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.isAuthenticated = true;
          this.setList('feed');
        } else {
          this.setList('all');
        }
      });

    const tagSub = this.store
      .pipe(select(state => state.articleList))
      .subscribe(({ tags, tagLoading }) => {
        this.tags = tags;
        this.tagLoading = tagLoading;
      });

    const sessionSub = this.store
      .pipe(select(state => state.app))
      .subscribe(({ hasSessionError }) => {
        if (hasSessionError) {
          window.location.reload();
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
