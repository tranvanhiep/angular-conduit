import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ArticleConfig, Article, Errors } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadArticles, resetArticles } from 'src/app/actions';
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
      .subscribe(articleListState => {
        const { loading, articles, articlesCount, errors } = articleListState;

        this.loading = loading;
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
    this.store.dispatch(resetArticles());
  }

  diffChecker(prev: ArticleConfig, curr: ArticleConfig) {
    if (!prev || curr.type !== prev.type) {
      return true;
    }

    const prevFilters = Object.keys(prev.filters);
    const currFilters = Object.keys(curr.filters);

    if (prevFilters.length >= currFilters.length) {
      return !prevFilters.every(key => {
        if (prev.filters[key] !== curr.filters[key]) {
          return false;
        }
        return true;
      });
    } else {
      return !currFilters.every(key => {
        if (prev.filters[key] !== curr.filters[key]) {
          return false;
        }
        return true;
      });
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
