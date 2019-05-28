import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import {
  AuthGuardService,
  EditableArticleResolverService,
} from 'src/app/services';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      article: EditableArticleResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
