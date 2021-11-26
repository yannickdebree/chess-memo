import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseColorComponent } from './case-color.component';

describe('CaseColorComponent', () => {
  let component: CaseColorComponent;
  let fixture: ComponentFixture<CaseColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
