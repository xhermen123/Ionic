import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAttendancePage } from './attendance.page';

describe('NurseAttendancePage', () => {
  let component: NurseAttendancePage;
  let fixture: ComponentFixture<NurseAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseAttendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
