import { Component, OnInit } from '@angular/core';
import { ArticleConfig } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { TagService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  config: ArticleConfig = {
    type: 'all',
    filters: {},
  };
  tags: string[] = [];
  tagLoaded = false;

  constructor(private route: ActivatedRoute, private tagService: TagService) {}

  ngOnInit() {
    this.route.data.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.setList('feed');
      } else {
        this.setList('all');
      }
    });

    this.tagService.getAll().subscribe(
      tags => {
        this.tags = tags;
        this.tagLoaded = true;
      },
      err => {
        this.tagLoaded = true;
      }
    );
  }

  setList(type: string, filters: object = {}) {
    this.config = { type, filters };
  }
}
