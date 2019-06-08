import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Comment } from 'src/app/models';
import { UserService, CommentService } from 'src/app/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() slug: string;
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<number>();

  canModify = false;
  isDeletingComment = false;

  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.canModify = user.username === this.comment.author.username;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete() {
    this.isDeletingComment = true;

    this.commentService.destroy(this.slug, this.comment.id).subscribe(
      data => {
        this.isDeletingComment = false;
        this.deleteComment.emit(this.comment.id);
      },
      err => {
        this.isDeletingComment = false;
      }
    );
  }
}
