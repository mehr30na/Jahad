/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FarmerComponent } from './farmer.component';

describe('FarmerComponent', () => {
  let component: FarmerComponent;
  let fixture: ComponentFixture<FarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
