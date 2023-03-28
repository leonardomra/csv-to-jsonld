import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDropAreaComponent } from './event-drop-area.component';

describe('EventDropAreaComponent', () => {
  let component: EventDropAreaComponent;
  let fixture: ComponentFixture<EventDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
