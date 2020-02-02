import { createAction, props } from '@ngrx/store';
import { Article, Errors, Comment, Profile } from '../models';

enum ArticleAction {
  LoadArticle = '[Article] Load Article',
  LoadArticleSuccess = '[Article] Load Article Success',
  LoadArticleFailure = '[Article] Load Article Failure',
  Favorite = '[Article] Favorite',
  FavoriteSuccess = '[Article] Favorite Success',
  FavoriteFailure = '[Article] Favorite Failure',
  Unfavorite = '[Article] Unfavorite',
  UnfavoriteSuccess = '[Article] Unfavorite Success',
  UnfavoriteFailure = '[Article] Unfavorite Failure',
  FollowArticle = '[Article] Follow',
  FollowArticleSuccess = '[Article] Follow Success',
  FollowArticleFailure = '[Article] Follow Failure',
  UnfollowArticle = '[Article] Unfollow',
  UnfollowArticleSuccess = '[Article] Unfollow Success',
  UnfollowArticleFailure = '[Article] Unfollow Failure',
  DeleteArticle = '[Article] Delete Article',
  DeleteArticleSuccess = '[Article] Delete Article Success',
  DeleteArticleFailure = '[Article] Delete Article Failure',
  AddComment = '[Article] Add Comment',
  AddCommentSuccess = '[Article] Add Comment Success',
  AddCommentFailure = '[Article] Add Comment Failure',
  DeleteComment = '[Article] Delete Comment',
  DeleteCommentSuccess = '[Article] Delete Comment Success',
  DeleteCommentFailure = '[Article] Delete Comment Failure',
  ResetArticle = '[Article] Reset',
}

export const loadArticle = createAction(
  ArticleAction.LoadArticle,
  props<{ slug: string }>()
);

export const loadArticleSuccess = createAction(
  ArticleAction.LoadArticleSuccess,
  props<{ article: Article; comments: Comment[] }>()
);

export const loadArticleFailure = createAction(
  ArticleAction.LoadArticleFailure,
  props<{ errors: Errors }>()
);

export const favorite = createAction(
  ArticleAction.Favorite,
  props<{ slug: string }>()
);

export const favoriteSuccess = createAction(
  ArticleAction.FavoriteSuccess,
  props<{ article: Article }>()
);

export const favoriteFailure = createAction(
  ArticleAction.FavoriteFailure,
  props<{ errors: Errors }>()
);

export const unfavorite = createAction(
  ArticleAction.Unfavorite,
  props<{ slug: string }>()
);

export const unfavoriteSuccess = createAction(
  ArticleAction.UnfavoriteSuccess,
  props<{ article: Article }>()
);

export const unfavoriteFailure = createAction(
  ArticleAction.UnfavoriteFailure,
  props<{ errors: Errors }>()
);

export const followArticle = createAction(
  ArticleAction.FollowArticle,
  props<{ username: string }>()
);

export const followArticleSuccess = createAction(
  ArticleAction.FollowArticleSuccess,
  props<{ author: Profile }>()
);

export const followArticleFailure = createAction(
  ArticleAction.FollowArticleFailure,
  props<{ errors: Errors }>()
);

export const unfollowArticle = createAction(
  ArticleAction.UnfollowArticle,
  props<{ username: string }>()
);

export const unfollowArticleSuccess = createAction(
  ArticleAction.UnfollowArticleSuccess,
  props<{ author: Profile }>()
);

export const unfollowArticleFailure = createAction(
  ArticleAction.UnfollowArticleFailure,
  props<{ errors: Errors }>()
);

export const deleteArticle = createAction(
  ArticleAction.DeleteArticle,
  props<{ slug: string }>()
);

export const deleteArticleSuccess = createAction(
  ArticleAction.DeleteArticleSuccess
);

export const deleteArticleFailure = createAction(
  ArticleAction.DeleteArticleFailure,
  props<{ errors: Errors }>()
);

export const addComment = createAction(
  ArticleAction.AddComment,
  props<{ slug: string; payload: string }>()
);

export const addCommentSuccess = createAction(
  ArticleAction.AddCommentSuccess,
  props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
  ArticleAction.AddCommentFailure,
  props<{ errors: Errors }>()
);

export const deleteComment = createAction(
  ArticleAction.DeleteArticle,
  props<{ slug: string; id: number }>()
);

export const deleteCommentSuccess = createAction(
  ArticleAction.DeleteArticleSuccess,
  props<{ id: number }>()
);

export const deleteCommentFailure = createAction(
  ArticleAction.DeleteArticleFailure,
  props<{ errors: Errors }>()
);

export const resetArticle = createAction(ArticleAction.ResetArticle);
