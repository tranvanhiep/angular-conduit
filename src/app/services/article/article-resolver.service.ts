import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Article } from 'src/app/models';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolverService implements Resolve<Article> {
  constructor(private articleService: ArticleService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService
      .get(route.params.slug)
      .pipe(catchError(err => this.router.navigate(['/'])));
  }
}
