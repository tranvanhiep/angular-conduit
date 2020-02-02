import { Article, Comment, Errors } from '../models';
import { createReducer, Action, on } from '@ngrx/store';
import {
  loadArticle,
  loadArticleSuccess,
  resetArticle,
  loadArticleFailure,
  favorite,
  unfavorite,
  favoriteSuccess,
  unfavoriteSuccess,
  favoriteFailure,
  unfavoriteFailure,
  followArticle,
  unfollowArticle,
  followArticleSuccess,
  unfollowArticleSuccess,
  followArticleFailure,
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

export interface ArticleState {
  loading: boolean;
  article: Article;
  deletingArticle: boolean;
  articleErrors: Errors;
  favoriting: boolean;
  following: boolean;
  comments: Comment[];
  commentDeleting: boolean;
  submittingComment: boolean;
  submittedComment: boolean;
  deletingComment: boolean;
  favoriteErrors: Errors;
  followErrors: Errors;
  commentErrors: Errors;
}

const initialState: ArticleState = {
  loading: false,
  article: null,
  deletingArticle: false,
  articleErrors: null,
  favoriting: false,
  following: false,
  comments: null,
  commentDeleting: false,
  submittingComment: false,
  submittedComment: false,
  deletingComment: false,
  favoriteErrors: null,
  followErrors: null,
  commentErrors: null,
};

const reducer = createReducer(
  initialState,
  on(loadArticle, state => ({ ...state, loading: true })),
  on(loadArticleSuccess, (state, { article, comments }) => ({
    ...state,
    loading: false,
    article,
    comments,
  })),
  on(loadArticleFailure, state => ({
    ...state,
    loading: false,
  })),
  on(favorite, unfavorite, state => ({
    ...state,
    favoriting: true,
    favoriteErrors: null,
  })),
  on(favoriteSuccess, unfavoriteSuccess, (state, { article }) => ({
    ...state,
    favoriting: false,
    article,
  })),
  on(favoriteFailure, unfavoriteFailure, (state, { errors }) => ({
    ...state,
    favoriting: false,
    favoriteErrors: errors,
  })),
  on(followArticle, unfollowArticle, state => ({
    ...state,
    following: true,
    followErrors: null,
  })),
  on(followArticleSuccess, unfollowArticleSuccess, (state, { author }) => ({
    ...state,
    following: false,
    article: {
      ...state.article,
      author,
    },
  })),
  on(followArticleFailure, unfollowArticleFailure, (state, { errors }) => ({
    ...state,
    following: false,
    followErrors: errors,
  })),
  on(deleteArticle, state => ({
    ...state,
    deletingArticle: true,
    articleErrors: null,
  })),
  on(deleteArticleSuccess, state => ({ ...state, deletingArticle: false })),
  on(deleteArticleFailure, (state, { errors }) => ({
    ...state,
    deletingArticle: false,
    articleErrors: errors,
  })),
  on(addComment, state => ({
    ...state,
    submittingComment: true,
    submittedComment: false,
    commentErrors: null,
  })),
  on(addCommentSuccess, (state, { comment }) => ({
    ...state,
    submittingComment: false,
    submittedComment: true,
    comments: [comment, ...state.comments],
  })),
  on(addCommentFailure, (state, { errors }) => ({
    ...state,
    submittingComment: false,
    commentErrors: errors,
  })),
  on(deleteComment, state => ({
    ...state,
    deletingComment: true,
    commentErrors: null,
  })),
  on(deleteCommentSuccess, (state, { id }) => ({
    ...state,
    deletingComment: false,
    comments: state.comments.filter(comment => comment.id !== id),
  })),
  on(deleteCommentFailure, (state, { errors }) => ({
    ...state,
    deletingComment: false,
    commentErrors: errors,
  })),
  on(resetArticle, () => initialState)
);

export function articleReducer(
  state: ArticleState | undefined,
  action: Action
) {
  return reducer(state, action);
}
