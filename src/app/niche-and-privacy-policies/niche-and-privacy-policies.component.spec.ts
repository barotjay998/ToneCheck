import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicheAndPrivacyPoliciesComponent } from './niche-and-privacy-policies.component';

describe('NicheAndPrivacyPoliciesComponent', () => {
  let component: NicheAndPrivacyPoliciesComponent;
  let fixture: ComponentFixture<NicheAndPrivacyPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NicheAndPrivacyPoliciesComponent]
    });
    fixture = TestBed.createComponent(NicheAndPrivacyPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
