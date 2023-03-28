import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDropAreaComponent } from './location-drop-area.component';

describe('LocationDropAreaComponent', () => {
  let component: LocationDropAreaComponent;
  let fixture: ComponentFixture<LocationDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
