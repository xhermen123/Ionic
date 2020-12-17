import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySchedulePage } from './schedule.page';

describe('FamilySchedulePage', () => {
  let component: FamilySchedulePage;
  let fixture: ComponentFixture<FamilySchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
