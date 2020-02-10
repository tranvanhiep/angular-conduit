import { Errors } from '../models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  loadTags,
  loadTagsSuccess,
  loadTagsFailure,
} from '../actions/home.action';

export interface HomeState {
  loading: boolean;
  tags: string[];
  errors: Errors;
}

const initialState = {
  loading: false,
  tags: null,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(loadTags, state => ({ ...state, loading: true, errors: null })),
  on(loadTagsSuccess, (state, { tags }) => ({
    ...state,
    loading: false,
    tags,
  })),
  on(loadTagsFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    errors,
  }))
);

export function homeReducer(state: HomeState | undefined, action: Action) {
  return reducer(state, action);
}
