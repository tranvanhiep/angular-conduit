import { Injectable } from '@angular/core';
import { ArticleConfig } from '../models';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apiService: ApiService) {}

  query(config: ArticleConfig) {
    const params = {};

    Object.keys(config.filters).forEach(value => {
      params[value] = config.filters[value];
    });

    return this.apiService.get(
      `/articles${config.type === 'feed' ? '/feed' : ''}`,
      new HttpParams({ fromObject: params })
    );
  }

  favorite(slug: string) {
    return this.apiService
      .post(`/articles/${slug}/favorite`)
      .pipe(map(data => data.article));
  }

  unfavorite(slug: string) {
    return this.apiService
      .delete(`/articles/${slug}/favorite`)
      .pipe(map(data => data.article));
  }
}
