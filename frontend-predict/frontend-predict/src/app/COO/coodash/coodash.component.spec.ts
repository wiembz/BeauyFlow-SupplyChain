import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COODashComponent } from './coodash.component';

describe('COODashComponent', () => {
  let component: COODashComponent;
  let fixture: ComponentFixture<COODashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [COODashComponent]
    });
    fixture = TestBed.createComponent(COODashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
