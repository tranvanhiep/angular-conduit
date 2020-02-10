import { Article, Errors } from '../models';
import { createReducer, Action, on } from '@ngrx/store';
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
  resetArticles,
} from '../actions';

export interface ArticleListState {
  articles: Article[];
  articlesCount: number;
  loading: boolean;
  favoriteErrors: Errors;
  errors: Errors;
}

const initialState: ArticleListState = {
  articles: null,
  loading: false,
  favoriteErrors: null,
  articlesCount: 0,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadArticles, state => ({
    ...state,
    loading: true,
    errors: null,
  })),
  on(loadArticlesSuccess, (state, { articles, articlesCount }) => ({
    ...state,
    articles,
    articlesCount,
    loading: false,
  })),
  on(loadArticlesFailure, (state, { errors }) => ({
    ...state,
    errors,
    loading: false,
  })),
  on(favoriteArticle, unfavoriteArticle, state => ({
    ...state,
    favoriteErrors: null,
  })),
  on(favoriteArticleSuccess, unfavoriteArticleSuccess, (state, { article }) => {
    const idx = state.articles.findIndex(el => el.slug === article.slug);
    const articles = [...state.articles];
    articles.splice(idx, 1, article);

    return {
      ...state,
      articles,
    };
  }),
  on(favoriteArticleFailure, unfavoriteArticleFailure, (state, { errors }) => ({
    ...state,
    favoriteErrors: errors,
  })),
  on(resetArticles, () => initialState)
);

export function articleListReducer(
  state: ArticleListState | undefined,
  action: Action
) {
  return reducer(state, action);
}
