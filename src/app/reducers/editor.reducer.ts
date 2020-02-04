import { Article, Errors } from '../models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  loadEditor,
  loadEditorSuccess,
  loadEditorFailure,
  submitArticle,
  submitArticleSuccess,
  submitArticleFailure,
  resetEditor,
} from '../actions';

export interface EditorState {
  article: Article;
  loading: boolean;
  isSubmitting: boolean;
  errors: Errors;
}

const initialState: EditorState = {
  article: null,
  loading: false,
  isSubmitting: false,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadEditor, state => ({ ...state, loading: true, errors: null })),
  on(loadEditorSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    article,
  })),
  on(loadEditorFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    errors,
  })),
  on(submitArticle, state => ({ ...state, loading: true, errors: null })),
  on(submitArticleSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    article,
  })),
  on(submitArticleFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    errors,
  })),
  on(resetEditor, () => initialState)
);

export function editorReducer(state: EditorState | undefined, action: Action) {
  return reducer(state, action);
}
