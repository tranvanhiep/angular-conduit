import { createAction, props } from '@ngrx/store';
import { Errors } from '../models';

enum HomeAction {
  LoadTags = '[ArticleList] Load Tag List',
  LoadTagsSuccess = '[ArticleList] Load Tag List Success',
  LoadTagsFailure = '[ArticleList] Load Tag List Failure',
}

export const loadTags = createAction(HomeAction.LoadTags);

export const loadTagsSuccess = createAction(
  HomeAction.LoadTagsSuccess,
  props<{ tags: string[] }>()
);

export const loadTagsFailure = createAction(
  HomeAction.LoadTagsFailure,
  props<{ errors: Errors }>()
);
