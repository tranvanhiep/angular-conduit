import { createAction, props } from '@ngrx/store';
import { ArticleConfig, Article, Errors } from '../models';

enum ArticleListAction {
  LoadArticles = '[ArticleList] Load Article List',
  LoadArticlesSuccess = '[ArticleList] Load Article List Success',
  LoadArticlesFailure = '[ArticleList] Load Article List Failure',
  LoadTags = '[ArticleList] Load Tag List',
  LoadTagsSuccess = '[ArticleList] Load Tag List Success',
  LoadTagsFailure = '[ArticleList] Load Tag List Failure',
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

export const loadTags = createAction(ArticleListAction.LoadTags);

export const loadTagsSuccess = createAction(
  ArticleListAction.LoadTagsSuccess,
  props<{ tags: string[] }>()
);

export const loadTagsFailure = createAction(
  ArticleListAction.LoadTagsFailure,
  props<{ errors: Errors }>()
);
