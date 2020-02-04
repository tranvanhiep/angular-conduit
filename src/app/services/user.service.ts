import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { User } from '../models';
import { map } from 'rxjs/operators';
import { State } from '../reducers';
import { Store, createSelector } from '@ngrx/store';
import { sessionLogin } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private store: Store<State>
  ) {}

  get isAuthenticated() {
    return createSelector(
      (state: State) => state.app,
      ({ currentUser, hasSessionError, appLoading }) => {
        if (currentUser || appLoading) {
          return true;
        }
        if (hasSessionError) {
          return false;
        }
        return false;
      }
    );
  }

  get isAuthorized() {
    return createSelector(
      (state: State) => state.editor,
      (state: State) => state.app,
      ({ article, loading }, { currentUser }) => {
        if (loading) {
          return true;
        }
        if (
          article &&
          currentUser &&
          article.author.username === currentUser.username
        ) {
          return true;
        }
        return false;
      }
    );
  }

  login(user): Observable<User> {
    return this.apiService
      .post('/users/login', { user })
      .pipe(map(user => user.user));
  }

  register(user): Observable<User> {
    return this.apiService
      .post('/users', { user })
      .pipe(map(user => user.user));
  }

  getCurrentUser() {
    return this.apiService.get('/user').pipe(map(user => user.user));
  }

  updateCurrentUser(user: User): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(map(data => data.user));
  }

  populate() {
    if (this.jwtService.getToken()) {
      this.store.dispatch(sessionLogin());
    }
  }
}
