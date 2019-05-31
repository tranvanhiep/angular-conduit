import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorListComponent } from './error-list/error-list.component';
import { ShowAuthedDirective } from '../directives';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';

@NgModule({
  declarations: [
    ErrorListComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
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
    ArticleListComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ShowAuthedDirective,
  ],
})
export class SharedModule {}
