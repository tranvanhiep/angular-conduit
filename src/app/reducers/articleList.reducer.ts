import { Article, Errors } from '../models';
import { createReducer, Action, on } from '@ngrx/store';
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
  resetArticles,
} from '../actions';

export interface ArticleListState {
  articles: Article[];
  articlesCount: number;
  articleLoading: boolean;
  favoriteErrors: Errors;
  tags: string[];
  tagLoading: boolean;
  articlesErrors: Errors;
  tagsErrors: Errors;
}

const initialState: ArticleListState = {
  articles: null,
  articleLoading: false,
  favoriteErrors: null,
  tags: null,
  tagLoading: false,
  articlesCount: 0,
  articlesErrors: null,
  tagsErrors: null,
};

const reducer = createReducer(
  initialState,
  on(loadArticles, state => ({
    ...state,
    articleLoading: true,
    articlesErrors: null,
  })),
  on(loadArticlesSuccess, (state, { articles, articlesCount }) => ({
    ...state,
    articles,
    articlesCount,
    articleLoading: false,
  })),
  on(loadArticlesFailure, (state, { errors }) => ({
    ...state,
    articlesErrors: errors,
    articleLoading: false,
  })),
  on(loadTags, state => ({ ...state, tagLoading: true, tagsErrors: null })),
  on(loadTagsSuccess, (state, { tags }) => ({
    ...state,
    tagLoading: false,
    tags,
  })),
  on(loadTagsFailure, (state, { errors }) => ({
    ...state,
    tagLoading: false,
    tagsErrors: errors,
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
