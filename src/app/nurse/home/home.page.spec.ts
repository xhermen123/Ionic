import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseHomePage } from './home.page';

describe('NurseHomePage', () => {
  let component: NurseHomePage;
  let fixture: ComponentFixture<NurseHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
