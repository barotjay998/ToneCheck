import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEligibleCategoryFullComponent } from './not-eligible-category-full.component';

describe('NotEligibleCategoryFullComponent', () => {
  let component: NotEligibleCategoryFullComponent;
  let fixture: ComponentFixture<NotEligibleCategoryFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotEligibleCategoryFullComponent]
    });
    fixture = TestBed.createComponent(NotEligibleCategoryFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
