import { NgModule } from '@angular/core';

import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared.module';
import { ArticleComponent } from './article.component';
import { NotNullDirective } from 'src/app/directives';
import { MarkdownPipe } from 'src/app/pipes';

@NgModule({
  declarations: [ArticleComponent, NotNullDirective, MarkdownPipe],
  imports: [SharedModule, ArticleRoutingModule],
})
export class ArticleModule {}
