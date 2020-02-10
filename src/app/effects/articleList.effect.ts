import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ArticleService } from '../services';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  favoriteArticle,
  favoriteArticleSuccess,
  favoriteArticleFailure,
  unfavoriteArticle,
  unfavoriteArticleSuccess,
  unfavoriteArticleFailure,
} from '../actions';
import { exhaustMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ArticleListEffect {
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      switchMap(({ config }) =>
        this.articleService.query(config).pipe(
          map(({ articles, articlesCount }) =>
            loadArticlesSuccess({ articles, articlesCount })
          ),
          catchError(err => of(loadArticlesFailure(err)))
        )
      )
    )
  );

  favorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteArticle),
      exhaustMap(({ slug }) =>
        this.articleService.favorite(slug).pipe(
          map(article => favoriteArticleSuccess({ article })),
          catchError(err => of(favoriteArticleFailure(err)))
        )
      )
    )
  );

  unfavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfavoriteArticle),
      exhaustMap(({ slug }) =>
        this.articleService.unfavorite(slug).pipe(
          map(article => unfavoriteArticleSuccess({ article })),
          catchError(err => of(unfavoriteArticleFailure(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {}
}
