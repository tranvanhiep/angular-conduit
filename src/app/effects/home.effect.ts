import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  loadTagsSuccess,
  loadTagsFailure,
  loadTags,
} from '../actions/home.action';
import { TagService } from '../services';
import { of } from 'rxjs';

@Injectable()
export class HomeEffect {
  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTags),
      switchMap(() =>
        this.tagService.getAll().pipe(
          map(tags => loadTagsSuccess({ tags })),
          catchError(err => of(loadTagsFailure(err)))
        )
      )
    )
  );

  constructor(private actions$: Actions, private tagService: TagService) {}
}
