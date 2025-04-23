import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMDashComponent } from './lmdash.component';

describe('LMDashComponent', () => {
  let component: LMDashComponent;
  let fixture: ComponentFixture<LMDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LMDashComponent]
    });
    fixture = TestBed.createComponent(LMDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
