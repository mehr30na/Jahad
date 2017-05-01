/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProvinceComponent } from './province.component';

describe('ProvinceComponent', () => {
  let component: ProvinceComponent;
  let fixture: ComponentFixture<ProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
