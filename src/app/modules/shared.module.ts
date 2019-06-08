import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ErrorListComponent,
  ArticlePreviewComponent,
  ArticleMetaComponent,
  ArticleListComponent,
  FavoriteButtonComponent,
  FollowButtonComponent,
  ArticleCommentComponent,
} from '../components';
import { ShowAuthedDirective } from '../directives';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ErrorListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ArticleCommentComponent,
    ShowAuthedDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ErrorListComponent,
    ArticleMetaComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ArticleCommentComponent,
    ShowAuthedDirective,
  ],
})
export class SharedModule {}
