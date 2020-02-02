import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState, authReducer } from './auth.reducer';
import { AppState, appReducer } from './app.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { SettingsState, settingsReducer } from './settings.reducer';
import { ProfileState, profileReducer } from './profile.reducer';
import { ArticleListState, articleListReducer } from './articleList.reducer';
import { ArticleState, articleReducer } from './article.reducer';

export interface State {
  auth: AuthState;
  app: AppState;
  articleList: ArticleListState;
  article: ArticleState;
  // editor;
  settings: SettingsState;
  profile: ProfileState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  app: appReducer,
  articleList: articleListReducer,
  article: articleReducer,
  settings: settingsReducer,
  profile: profileReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
