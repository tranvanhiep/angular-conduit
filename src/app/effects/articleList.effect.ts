import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ArticleService, TagService } from '../services';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadTags,
  loadTagsSuccess,
  loadTagsFailure,
  favoriteArticle,
  favoriteArticleSuccess,
  favoriteArticleFailure,
  unfavoriteArticle,
  unfavoriteArticleSuccess,
  unfavoriteArticleFailure,
} from '../actions';
import { exhaustMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ArticleListEffect {
  getArticles$ = createEffect(() =>
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

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTags),
      switchMap(() =>
        this.tagService.getAll().pipe(
          map(tags => loadTagsSuccess({ tags })),
          catchError(err => of(loadTagsFailure(err)))
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
    private articleService: ArticleService,
    private tagService: TagService
  ) {}
}
