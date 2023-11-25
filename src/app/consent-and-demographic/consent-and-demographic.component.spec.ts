import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentAndDemographicComponent } from './consent-and-demographic.component';

describe('ConsentAndDemographicComponent', () => {
  let component: ConsentAndDemographicComponent;
  let fixture: ComponentFixture<ConsentAndDemographicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsentAndDemographicComponent]
    });
    fixture = TestBed.createComponent(ConsentAndDemographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
