import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolverService } from 'src/app/services';
import {
  ProfileArticleComponent,
  ProfileFavoriteComponent,
} from 'src/app/components';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService,
    },
    children: [
      {
        path: '',
        component: ProfileArticleComponent,
      },
      {
        path: 'favorites',
        component: ProfileFavoriteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
