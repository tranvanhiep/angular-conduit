import { NgModule } from '@angular/core';

import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from 'src/app/shared';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [SharedModule, ArticleRoutingModule],
})
export class ArticleModule {}
