import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfilePage } from './profile.page';

describe('FamilyProfilePage', () => {
  let component: FamilyProfilePage;
  let fixture: ComponentFixture<FamilyProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
