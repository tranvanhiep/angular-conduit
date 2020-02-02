import { Article, Errors } from '../models';
import { createReducer, Action, on } from '@ngrx/store';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadTags,
  loadTagsSuccess,
  loadTagsFailure,
} from '../actions';

export interface ArticleListState {
  articles: Article[];
  articlesCount: number;
  articleLoading: boolean;
  tags: string[];
  tagLoading: boolean;
  errors: Errors;
}

const initialState: ArticleListState = {
  articles: null,
  articleLoading: false,
  tags: null,
  tagLoading: false,
  articlesCount: 0,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadArticles, state => ({ ...state, articleLoading: true, errors: null })),
  on(loadArticlesSuccess, (state, { articles, articlesCount }) => ({
    ...state,
    articles,
    articlesCount,
    articleLoading: false,
  })),
  on(loadArticlesFailure, (state, { errors }) => ({
    ...state,
    errors,
    articleLoading: false,
  })),
  on(loadTags, state => ({ ...state, tagLoading: true, errors: null })),
  on(loadTagsSuccess, (state, { tags }) => ({
    ...state,
    tagLoading: false,
    tags,
  })),
  on(loadTagsFailure, (state, { errors }) => ({
    ...state,
    tagLoading: false,
    errors,
  }))
);

export function articleListReducer(
  state: ArticleListState | undefined,
  action: Action
) {
  return reducer(state, action);
}
