import { createAction, props } from '@ngrx/store';
import { ArticleConfig, Article, Errors } from '../models';

enum ArticleListAction {
  LoadArticles = '[ArticleList] Load Article List',
  LoadArticlesSuccess = '[ArticleList] Load Article List Success',
  LoadArticlesFailure = '[ArticleList] Load Article List Failure',
  Favorite = '[ArticleList] Favorite',
  FavoriteSuccess = '[ArticleList] Favorite Success',
  FavoriteFailure = '[ArticleList] Favorite Failure',
  Unfavorite = '[ArticleList] Unfavorite',
  UnfavoriteSuccess = '[ArticleList] Unfavorite Success',
  UnfavoriteFailure = '[ArticleList] Unfavorite Failure',
  ResetArticles = '[ArticleList] Reset',
}

export const loadArticles = createAction(
  ArticleListAction.LoadArticles,
  props<{ config: ArticleConfig }>()
);

export const loadArticlesSuccess = createAction(
  ArticleListAction.LoadArticlesSuccess,
  props<{ articles: Article[]; articlesCount: number }>()
);

export const loadArticlesFailure = createAction(
  ArticleListAction.LoadArticlesFailure,
  props<{ errors: Errors }>()
);

export const favoriteArticle = createAction(
  ArticleListAction.Favorite,
  props<{ slug: string }>()
);

export const favoriteArticleSuccess = createAction(
  ArticleListAction.FavoriteSuccess,
  props<{ article: Article }>()
);

export const favoriteArticleFailure = createAction(
  ArticleListAction.FavoriteFailure,
  props<{ errors: Errors }>()
);

export const unfavoriteArticle = createAction(
  ArticleListAction.Unfavorite,
  props<{ slug: string }>()
);

export const unfavoriteArticleSuccess = createAction(
  ArticleListAction.UnfavoriteSuccess,
  props<{ article: Article }>()
);

export const unfavoriteArticleFailure = createAction(
  ArticleListAction.UnfavoriteFailure,
  props<{ errors: Errors }>()
);

export const resetArticles = createAction(ArticleListAction.ResetArticles);
