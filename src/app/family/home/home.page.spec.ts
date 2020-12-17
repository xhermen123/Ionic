import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHomePage } from './home.page';

describe('FamilyHomePage', () => {
  let component: FamilyHomePage;
  let fixture: ComponentFixture<FamilyHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
