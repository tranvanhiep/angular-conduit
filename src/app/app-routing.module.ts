import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsModule',
  },
  {
    path: 'editor',
    loadChildren: './modules/editor/editor.module#EditorModule',
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule',
  },
  {
    path: 'article',
    loadChildren: './modules/article/article.module#ArticleModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
