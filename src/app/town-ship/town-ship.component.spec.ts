/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TownShipComponent } from './town-ship.component';

describe('TownShipComponent', () => {
  let component: TownShipComponent;
  let fixture: ComponentFixture<TownShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
