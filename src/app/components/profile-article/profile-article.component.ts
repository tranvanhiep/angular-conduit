import { Component, OnInit } from '@angular/core';
import { ArticleConfig, Profile } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent implements OnInit {
  profileArticle: ArticleConfig = { type: 'all', filters: {} };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profileArticle = {
        ...this.profileArticle,
        ...{ filters: { author: data.profile.username } },
      };
    });
  }
}
