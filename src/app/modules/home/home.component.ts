import { Component, OnInit } from '@angular/core';
import { ArticleConfig } from 'src/app/models';

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

  constructor() {}

  ngOnInit() {}
}
