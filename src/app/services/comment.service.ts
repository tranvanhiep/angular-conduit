import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { CommentBody } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  getAll(slug: string) {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  add(slug: string, comment: CommentBody) {
    return this.apiService
      .post(`/articles/${slug}/comments`, { comment })
      .pipe(map(data => data.comment));
  }

  destroy(slug: string, id: number) {
    return this.apiService.delete(`/articles/${slug}/comments/${id}`);
  }
}
