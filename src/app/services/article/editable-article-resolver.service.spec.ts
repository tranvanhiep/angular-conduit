import { TestBed } from '@angular/core/testing';

import { EditableArticleResolverService } from './editable-article-resolver.service';

describe('EditableArticleResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditableArticleResolverService = TestBed.get(EditableArticleResolverService);
    expect(service).toBeTruthy();
  });
});
