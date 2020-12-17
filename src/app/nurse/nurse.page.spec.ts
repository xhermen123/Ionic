import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NursePage } from "./nurse.page";

describe("NursePage", () => {
  let component: NursePage;
  let fixture: ComponentFixture<NursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NursePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
