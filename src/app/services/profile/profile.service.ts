import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';
import { createSelector } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  get userProfile() {
    return createSelector(
      (state: State) => state.app,
      (state: State) => state.profile,
      (appState, profileState) => {
        const { currentUser } = appState;
        const { profile } = profileState;
        if (!profile || !currentUser) {
          return {
            isUser: false,
            ...profileState,
          };
        }

        return {
          isUser: currentUser.username === profile.username,
          ...profileState,
        };
      }
    );
  }

  get followProfile() {
    return createSelector(
      (state: State) => state.app,
      (state: State) => state.profile,
      ({ currentUser }, profileState) => ({
        isAuthed: !!currentUser,
        ...profileState,
      })
    );
  }

  follow(username: string) {
    return this.apiService
      .post(`/profiles/${username}/follow`)
      .pipe(map(data => data.profile));
  }

  unfollow(username: string) {
    return this.apiService
      .delete(`/profiles/${username}/follow`)
      .pipe(map(data => data.profile));
  }

  get(username: string) {
    return this.apiService
      .get(`/profiles/${username}`)
      .pipe(map(data => data.profile));
  }
}
