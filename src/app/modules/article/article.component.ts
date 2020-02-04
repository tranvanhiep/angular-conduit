import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article, Comment, User, Errors } from 'src/app/models';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { notNullValidator } from 'src/app/directives';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import {
  loadArticle,
  addComment,
  deleteArticle,
  resetArticle,
} from 'src/app/actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: Article;
  comments: Comment[];
  currentUser: User;
  canModify = false;
  deletingArticle = false;
  articleErrors: Errors;
  submittingComment = false;
  deletingComment = false;
  commentControl = new FormControl('', [Validators.required, notNullValidator]);
  commentErrors: Errors;
  favoriteErrors: Errors;
  followErrors: Errors;
  loading = false;
  favoriting = false;
  following = false;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(state => state.router),
        take(1)
      )
      .subscribe(({ state }) => {
        const { slug } = state.params;
        this.store.dispatch(loadArticle({ slug }));
      });

    const articleSub = this.store
      .pipe(select(({ article, app }) => ({ article, app })))
      .subscribe(state => {
        const {
          article,
          deletingArticle,
          articleErrors,
          comments,
          loading,
          commentErrors,
          favoriteErrors,
          followErrors,
          favoriting,
          following,
          submittingComment,
          submittedComment,
          deletingComment,
        } = state.article;
        const { currentUser } = state.app;
        this.article = article;
        this.deletingArticle = deletingArticle;
        this.articleErrors = articleErrors;
        this.comments = comments;
        this.loading = loading;
        this.commentErrors = commentErrors;
        this.favoriteErrors = favoriteErrors;
        this.followErrors = followErrors;
        this.favoriting = favoriting;
        this.following = following;
        this.currentUser = currentUser;
        this.submittingComment = submittingComment;
        this.deletingComment = deletingComment;

        if (submittedComment) {
          this.commentControl.reset('');
        }

        if (article && currentUser) {
          const { author } = article;
          this.canModify = currentUser.username === author.username;
        }
      });

    this.subscriptions.push(articleSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(resetArticle());
  }

  deleteArticle() {
    const { slug } = this.article;
    this.store.dispatch(deleteArticle({ slug }));
  }

  addComment() {
    const { slug } = this.article;
    this.store.dispatch(
      addComment({ slug, payload: String(this.commentControl.value).trim() })
    );
  }
}
