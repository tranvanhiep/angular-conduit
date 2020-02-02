import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Comment } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { deleteComment } from 'src/app/actions';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() slug: string;
  @Input() comment: Comment;
  @Input() isDeletingComment = false;

  canModify = false;
  private subscription: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscription = this.store
      .pipe(select(state => state.app))
      .subscribe(({ currentUser }) => {
        if (currentUser) {
          const { author } = this.comment;
          this.canModify = currentUser.username === author.username;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete() {
    this.store.dispatch(
      deleteComment({ slug: this.slug, id: this.comment.id })
    );
  }
}
