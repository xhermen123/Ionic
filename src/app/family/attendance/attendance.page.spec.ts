import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAttendancePage } from './attendance.page';

describe('FamilyAttendancePage', () => {
  let component: FamilyAttendancePage;
  let fixture: ComponentFixture<FamilyAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAttendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
