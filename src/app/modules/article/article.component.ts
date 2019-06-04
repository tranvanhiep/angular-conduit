import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Comment, User, Errors } from 'src/app/models';
import { CommentService, UserService, ArticleService } from 'src/app/services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

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
  isDeleting = false;
  isSubmitting = false;
  commentControl = new FormControl('', [Validators.required]);
  commentErrors = { errors: {} };

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.article = data.article;
      this.populateComments();
    });

    this.subscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.canModify = user.username === this.article.author.username;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollow(follow: boolean) {
    this.article.author.following = follow;
  }

  populateComments() {
    this.commentService.getAll(this.article.slug).subscribe(comments => {
      this.comments = comments;
    });
  }

  onDeleteComment(id: number) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.destroy(this.article.slug).subscribe(
      article => {
        this.isDeleting = false;
        this.router.navigate(['/']);
      },
      err => {
        this.isDeleting = false;
      }
    );
  }

  addComment() {
    this.isSubmitting = true;
    this.commentErrors = { errors: {} };

    this.commentService
      .add(this.article.slug, this.commentControl.value)
      .subscribe(
        comment => {
          this.isSubmitting = false;
          this.comments.unshift(comment);
          this.commentControl.reset('');
        },
        err => {
          this.isSubmitting = false;
          this.commentErrors = err;
        }
      );
  }
}
