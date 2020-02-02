import { Component, OnInit } from '@angular/core';
import { ArticleConfig } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-profile-favorite',
  templateUrl: './profile-favorite.component.html',
  styleUrls: ['./profile-favorite.component.scss'],
})
export class ProfileFavoriteComponent implements OnInit {
  profileFavorite: ArticleConfig;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(select(state => state.profile)).subscribe(({ profile }) => {
      if (profile) {
        const { username } = profile;
        this.profileFavorite = {
          type: 'all',
          filters: { favorited: username },
        };
      }
    });
  }
}
