import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState, authReducer } from './auth.reducer';
import { AppState, appReducer } from './app.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { SettingsState, settingsReducer } from './settings.reducer';
import { ProfileState, profileReducer } from './profile.reducer';
import { ArticleListState, articleListReducer } from './articleList.reducer';
import { ArticleState, articleReducer } from './article.reducer';
import { EditorState, editorReducer } from './editor.reducer';
import { RouterStateUrl } from './custom-route.serializer';

export interface State {
  auth: AuthState;
  app: AppState;
  articleList: ArticleListState;
  article: ArticleState;
  editor: EditorState;
  settings: SettingsState;
  profile: ProfileState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  app: appReducer,
  articleList: articleListReducer,
  article: articleReducer,
  editor: editorReducer,
  settings: settingsReducer,
  profile: profileReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export * from './custom-route.serializer';
