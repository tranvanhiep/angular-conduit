import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ArticleConfig, Article, Errors } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadArticles } from 'src/app/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  @Input() limit: number;
  query: ArticleConfig;
  currentPage = 1;
  articles: Article[];
  totalPages: number[];
  loading = false;
  errors: Errors;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<State>) {}

  @Input() set config(config: ArticleConfig) {
    if (config && this.diffChecker(this.query, config)) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit() {
    const articlesSub = this.store
      .pipe(select(state => state.articleList))
      .subscribe(({ articleLoading, articles, articlesCount, errors }) => {
        this.loading = articleLoading;
        this.articles = articles;
        this.errors = errors;
        this.totalPages = Array.from(
          new Array(Math.ceil(articlesCount / this.limit)),
          (value, key) => ++key
        );
      });

    this.subscriptions.push(articlesSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  diffChecker(oldObj: ArticleConfig, newObj: ArticleConfig) {
    let diff = false;
    if (!oldObj || !newObj) {
      return true;
    }
    if (oldObj.type !== newObj.type) {
      return true;
    } else {
      for (const key in Object.keys(oldObj.filters).length >=
      Object.keys(newObj).length
        ? oldObj.filters
        : newObj.filters) {
        if (oldObj.filters[key] !== newObj.filters[key]) {
          diff = true;
          break;
        }
      }
      return diff;
    }
  }

  runQuery() {
    this.totalPages = [1];

    if (this.limit) {
      // Fix can't assign value to readonly object
      const { type, filters } = this.query;
      this.query = { type, filters: { ...filters } };

      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.store.dispatch(loadArticles({ config: this.query }));
  }

  setPage(page: number) {
    this.currentPage = page;
    this.runQuery();
  }
}
