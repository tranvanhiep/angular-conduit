import { Component, OnInit } from '@angular/core';
import { ArticleConfig } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit {
  profileArticle: ArticleConfig;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(select(state => state.profile)).subscribe(({ profile }) => {
      if (profile) {
        const { username } = profile;
        this.profileArticle = {
          type: 'all',
          filters: { author: username },
        };
      }
    });
  }
}
