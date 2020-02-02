import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Article, Errors } from 'src/app/models';
import { ArticleService } from 'src/app/services';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  articleForm: FormGroup;
  article: Article = {} as Article;
  tagField = new FormControl('');
  isSubmitting = false;
  errors: Errors = {};

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.article.tagList = [];
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (!!data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
  }

  addTag() {
    const tag = this.tagField.value;

    if (tag.trim() && this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tag: string) {
    this.article.tagList = this.article.tagList.filter(value => value !== tag);
  }

  submit() {
    this.isSubmitting = true;
    Object.assign(this.article, this.articleForm.value);

    this.articleService.save(this.article).subscribe(
      (article: Article) => {
        this.isSubmitting = false;
        this.router.navigate(['/article', article.slug]);
      },
      err => {
        this.isSubmitting = false;
        this.errors = err;
      }
    );
  }
}
