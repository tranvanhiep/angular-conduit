import { Injectable } from '@angular/core';
import { ArticleConfig } from '../models';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

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
}
