import { TestBed } from '@angular/core/testing';

import { ArticleResolverService } from './article-resolver.service';

describe('ArticleResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleResolverService = TestBed.get(ArticleResolverService);
    expect(service).toBeTruthy();
  });
});
