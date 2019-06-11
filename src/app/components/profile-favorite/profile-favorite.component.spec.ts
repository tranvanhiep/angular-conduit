import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavoriteComponent } from './profile-favorite.component';

describe('ProfileFavoriteComponent', () => {
  let component: ProfileFavoriteComponent;
  let fixture: ComponentFixture<ProfileFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
