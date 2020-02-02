import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { favorite, unfavorite } from 'src/app/actions';
import { take, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Input() isSubmitting = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {}

  toggleFavorite() {
    this.store
      .pipe(
        select(this.userService.isAuthenticated),
        take(1),
        exhaustMap(isAuthed => {
          if (!isAuthed) {
            this.router.navigate(['/login']);
          }
          return this.store.pipe(select(state => state.router));
        })
      )
      .subscribe(({ state }) => {
        const { slug } = this.article;

        if (/\/article\//.test(state.url)) {
          if (!this.article.favorited) {
            this.store.dispatch(favorite({ slug }));
          } else {
            this.store.dispatch(unfavorite({ slug }));
          }
        } else {
          // article list favorite
        }
      });
  }
}
