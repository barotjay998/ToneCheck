import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSurveyComponent } from './post-survey.component';

describe('PostSurveyComponent', () => {
  let component: PostSurveyComponent;
  let fixture: ComponentFixture<PostSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSurveyComponent]
    });
    fixture = TestBed.createComponent(PostSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
