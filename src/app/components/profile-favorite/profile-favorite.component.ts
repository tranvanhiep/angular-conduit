import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, ArticleConfig } from 'src/app/models';

@Component({
  selector: 'app-profile-favorite',
  templateUrl: './profile-favorite.component.html',
  styleUrls: ['./profile-favorite.component.scss'],
})
export class ProfileFavoriteComponent implements OnInit {
  profileFavorite: ArticleConfig = { type: 'all', filters: {} };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profileFavorite = {
        ...this.profileFavorite,
        ...{ filters: { favorited: data.profile.username } },
      };
    });
  }
}
