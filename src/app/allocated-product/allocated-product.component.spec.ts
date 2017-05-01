/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllocatedProductComponent } from './allocated-product.component';

describe('AllocatedProductComponent', () => {
  let component: AllocatedProductComponent;
  let fixture: ComponentFixture<AllocatedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
