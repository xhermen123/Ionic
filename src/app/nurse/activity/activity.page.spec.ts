import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseActivityPage } from './activity.page';

describe('NurseActivityPage', () => {
  let component: NurseActivityPage;
  let fixture: ComponentFixture<NurseActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
