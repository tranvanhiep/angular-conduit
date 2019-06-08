import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models';
import { ArticleService, UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() toogle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap(isAuthed => {
          if (!isAuthed) {
            this.router.navigate(['/login']);
            return of(null);
          }

          if (!this.article.favorited) {
            return this.articleService.favorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toogle.emit(true);
                },
                err => {
                  this.isSubmitting = false;
                }
              )
            );
          } else {
            return this.articleService.unfavorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toogle.emit(false);
                },
                err => {
                  this.isSubmitting = false;
                }
              )
            );
          }
        })
      )
      .subscribe();
  }
}
