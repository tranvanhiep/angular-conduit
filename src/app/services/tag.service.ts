import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private apiService: ApiService) {}

  getAll() {
    return this.apiService.get('/tags').pipe(map(data => data.tags));
  }
}
