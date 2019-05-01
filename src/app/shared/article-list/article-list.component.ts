import { Component, OnInit, Input } from '@angular/core';
import { ArticleConfig, Article } from 'src/app/models';
import { ArticleService } from 'src/app/services';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() limit: number;
  query: ArticleConfig;
  currentPage = 1;
  articles: Article[];
  totalPages: number[];
  loading = false;

  constructor(private articleService: ArticleService) {}

  @Input() set config(config: ArticleConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit() {}

  runQuery() {
    this.loading = true;
    this.articles = [];
    this.totalPages = [1];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.query(this.query).subscribe(
      data => {
        this.loading = false;
        this.articles = data.articles;
        this.totalPages = Array.from(
          new Array(Math.ceil(data.articlesCount / this.limit)),
          (value, key) => ++key
        );
      },
      err => {
        this.loading = false;
        this.currentPage = 1;
      }
    );
  }

  setPage(page: number) {
    this.currentPage = page;
    this.runQuery();
  }
}
