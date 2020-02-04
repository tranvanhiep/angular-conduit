import { createAction, props } from '@ngrx/store';
import { Article, Errors } from '../models';

enum EditorAction {
  LoadEditor = '[Editor] Load Editor',
  LoadEditorSuccess = '[Editor] Load Editor Success',
  LoadEditorFailure = '[Editor] Load Editor Failure',
  SubmitArticle = '[Editor] Submit Article',
  SubmitArticleSuccess = '[Editor] Submit Article Success',
  SubmitArticleFailure = '[Editor] Submit Article Failure',
  ResetEditor = '[Editor] Reset',
}

export const loadEditor = createAction(
  EditorAction.LoadEditor,
  props<{ slug: string }>()
);

export const loadEditorSuccess = createAction(
  EditorAction.LoadEditorSuccess,
  props<{ article: Article }>()
);

export const loadEditorFailure = createAction(
  EditorAction.LoadEditorFailure,
  props<{ errors: Errors }>()
);

export const submitArticle = createAction(
  EditorAction.SubmitArticle,
  props<{ article: Article }>()
);

export const submitArticleSuccess = createAction(
  EditorAction.SubmitArticleSuccess,
  props<{ article: Article }>()
);

export const submitArticleFailure = createAction(
  EditorAction.SubmitArticleFailure,
  props<{ errors: Errors }>()
);

export const resetEditor = createAction(EditorAction.ResetEditor);
