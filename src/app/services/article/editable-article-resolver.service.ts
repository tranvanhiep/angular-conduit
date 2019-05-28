import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Article } from '../../models';
import { ArticleService } from './article.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolverService implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.get(route.params.slug).pipe(
      map((article: Article) => {
        if (
          article.author.username === this.userService.getCurrentUser().username
        ) {
          return article;
        } else {
          this.router.navigate(['/']);
        }
      }),
      catchError(err => this.router.navigate(['/']))
    );
  }
}
