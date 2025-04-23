import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCPMDashComponent } from './scpmdash.component';

describe('SCPMDashComponent', () => {
  let component: SCPMDashComponent;
  let fixture: ComponentFixture<SCPMDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SCPMDashComponent]
    });
    fixture = TestBed.createComponent(SCPMDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
