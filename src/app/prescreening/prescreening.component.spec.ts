import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescreeningComponent } from './prescreening.component';

describe('PrescreeningComponent', () => {
  let component: PrescreeningComponent;
  let fixture: ComponentFixture<PrescreeningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescreeningComponent]
    });
    fixture = TestBed.createComponent(PrescreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
