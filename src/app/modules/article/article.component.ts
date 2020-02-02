import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Comment, User, Errors } from 'src/app/models';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { notNullValidator } from 'src/app/directives';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadArticle, addComment, deleteArticle } from 'src/app/actions';

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

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    const routeSub = this.route.params.subscribe(({ slug }) => {
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

    this.subscriptions.push(routeSub, articleSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
