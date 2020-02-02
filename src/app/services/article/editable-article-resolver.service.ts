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
import { map, catchError, switchMap } from 'rxjs/operators';
import { Store, select, createSelector } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolverService implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private store: Store<State>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articleService.get(route.params.slug).pipe(
      switchMap((article: Article) => {
        return this.store.pipe(
          select(
            createSelector(
              state => state.app,
              appState => {
                const { author } = article;
                const { currentUser } = appState;
                if (currentUser && author.username === currentUser.username) {
                  return article;
                } else {
                  return null;
                }
              }
            )
          )
        );
      }),
      map((article: Article) => {
        if (article) {
          return article;
        } else {
          this.router.navigate(['/']);
        }
      }),
      catchError(err => this.router.navigate(['/']))
    );
  }
}
