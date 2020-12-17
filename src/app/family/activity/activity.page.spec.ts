import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyActivityPage } from './activity.page';

describe('FamilyActivityPage', () => {
  let component: FamilyActivityPage;
  let fixture: ComponentFixture<FamilyActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
