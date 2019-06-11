import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

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
