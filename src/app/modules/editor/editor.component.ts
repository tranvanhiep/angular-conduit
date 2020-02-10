import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Errors } from 'src/app/models';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadEditor, submitArticle, resetEditor } from 'src/app/actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  articleForm: FormGroup;
  slug: string;
  tagField = new FormControl('');
  isSubmitting = false;
  errors: Errors = {};
  loading = false;
  tagList: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store
      .pipe(
        select(state => state.router),
        take(1)
      )
      .subscribe(({ state }) => {
        const { slug } = state.params;
        if (slug) {
          this.slug = slug;
          this.store.dispatch(loadEditor({ slug }));
        }
      });

    const authSub = this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthed => {
        if (!isAuthed) {
          this.router.navigate(['/login']);
        }
      });

    const authorSub = this.store
      .pipe(select(this.userService.isAuthorized))
      .subscribe(isAuthor => {
        if (!isAuthor && this.slug) {
          this.router.navigate(['/']);
        }
      });

    const editorSub = this.store
      .pipe(select(state => state.editor))
      .subscribe(editorState => {
        const { article, loading, isSubmitting, errors } = editorState;
        this.loading = loading;
        this.isSubmitting = isSubmitting;
        this.errors = errors;

        if (article) {
          // Fix can't assign readonly variable
          this.tagList = [...article.tagList];
          this.articleForm.patchValue(article);
        }
      });

    this.subscriptions.push(authSub, authorSub, editorSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(resetEditor());
  }

  addTag() {
    const tag = this.tagField.value;

    if (tag.trim() && this.tagList.indexOf(tag) < 0) {
      this.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tag: string) {
    this.tagList = this.tagList.filter(value => value !== tag);
  }

  submit() {
    const article = {
      ...this.articleForm.value,
      tagList: this.tagList,
      slug: this.slug,
    };

    this.store.dispatch(submitArticle({ article }));
  }
}
