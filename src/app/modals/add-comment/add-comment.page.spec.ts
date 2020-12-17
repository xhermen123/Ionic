import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentModal } from './add-comment.page';

describe('AddCommentModal', () => {
  let component: AddCommentModal;
  let fixture: ComponentFixture<AddCommentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommentModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
