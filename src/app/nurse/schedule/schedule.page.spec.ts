import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSchedulePage } from './schedule.page';

describe('NurseSchedulePage', () => {
  let component: NurseSchedulePage;
  let fixture: ComponentFixture<NurseSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
