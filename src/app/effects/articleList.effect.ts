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
} from '../actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ArticleListEffect {
  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      exhaustMap(({ config }) =>
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
      exhaustMap(() =>
        this.tagService.getAll().pipe(
          map(
            tags => loadTagsSuccess({ tags }),
            catchError(err => of(loadTagsFailure(err)))
          )
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
