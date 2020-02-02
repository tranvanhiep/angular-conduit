import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadArticle,
  loadArticleSuccess,
  loadArticleFailure,
  favorite,
  favoriteSuccess,
  favoriteFailure,
  unfavorite,
  unfavoriteSuccess,
  unfavoriteFailure,
  followArticle,
  followArticleSuccess,
  followArticleFailure,
  unfollowArticle,
  unfollowArticleSuccess,
  unfollowArticleFailure,
  addComment,
  addCommentSuccess,
  addCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  deleteArticle,
  deleteArticleSuccess,
  deleteArticleFailure,
} from '../actions';
import { exhaustMap, catchError, map, tap } from 'rxjs/operators';
import { ArticleService, CommentService, ProfileService } from '../services';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffect {
  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticle),
      exhaustMap(({ slug }) =>
        forkJoin(
          this.articleService.get(slug),
          this.commentService.getAll(slug)
        ).pipe(
          map(res => loadArticleSuccess({ article: res[0], comments: res[1] })),
          catchError(err => of(loadArticleFailure(err)))
        )
      )
    )
  );

  loadArticleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadArticleFailure),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  favorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favorite),
      exhaustMap(({ slug }) =>
        this.articleService.favorite(slug).pipe(
          map(article => favoriteSuccess({ article })),
          catchError(err => of(favoriteFailure(err)))
        )
      )
    )
  );

  unfavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfavorite),
      exhaustMap(({ slug }) =>
        this.articleService.unfavorite(slug).pipe(
          map(article => unfavoriteSuccess({ article })),
          catchError(err => of(unfavoriteFailure(err)))
        )
      )
    )
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followArticle),
      exhaustMap(({ username }) =>
        this.profileService.follow(username).pipe(
          map(author => followArticleSuccess({ author })),
          catchError(err => of(followArticleFailure(err)))
        )
      )
    )
  );

  unfollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfollowArticle),
      exhaustMap(({ username }) =>
        this.profileService.unfollow(username).pipe(
          map(author => unfollowArticleSuccess({ author })),
          catchError(err => of(unfollowArticleFailure(err)))
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticle),
      exhaustMap(({ slug }) =>
        this.articleService.destroy(slug).pipe(
          map(() => deleteArticleSuccess()),
          catchError(err => of(deleteArticleFailure(err)))
        )
      )
    )
  );

  deleteArticleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addComment),
      exhaustMap(({ slug, payload }) =>
        this.commentService.add(slug, payload).pipe(
          map(comment => addCommentSuccess({ comment })),
          catchError(err => of(addCommentFailure(err)))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      exhaustMap(({ slug, id }) =>
        this.commentService.destroy(slug, id).pipe(
          map(id => deleteCommentSuccess({ id })),
          catchError(err => of(deleteCommentFailure(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private router: Router
  ) {}
}
