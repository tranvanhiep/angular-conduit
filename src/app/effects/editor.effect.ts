import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  loadEditor,
  loadEditorSuccess,
  loadEditorFailure,
  submitArticle,
  submitArticleSuccess,
  submitArticleFailure,
} from '../actions';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { ArticleService } from '../services';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class EditorEffect {
  loadEditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEditor),
      exhaustMap(({ slug }) =>
        this.articleService.get(slug).pipe(
          map(article => loadEditorSuccess({ article })),
          catchError(err => of(loadEditorFailure(err)))
        )
      )
    )
  );

  loadEditorFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEditorFailure),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  submitArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitArticle),
      exhaustMap(({ article }) =>
        this.articleService.save(article).pipe(
          map(article => submitArticleSuccess({ article })),
          catchError(err => of(submitArticleFailure(err)))
        )
      )
    )
  );

  submitArticleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitArticleSuccess),
        tap(({ article }) => this.router.navigate(['/article', article.slug]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
