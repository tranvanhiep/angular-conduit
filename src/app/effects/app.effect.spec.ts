import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppEffect } from './app.effect';

describe('AppEffect', () => {
  let actions$: Observable<any>;
  let effects: AppEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<AppEffect>(AppEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
