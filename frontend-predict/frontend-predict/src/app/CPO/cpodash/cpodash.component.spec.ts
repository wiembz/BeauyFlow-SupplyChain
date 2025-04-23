import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPODashComponent } from './cpodash.component';

describe('CPODashComponent', () => {
  let component: CPODashComponent;
  let fixture: ComponentFixture<CPODashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CPODashComponent]
    });
    fixture = TestBed.createComponent(CPODashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
