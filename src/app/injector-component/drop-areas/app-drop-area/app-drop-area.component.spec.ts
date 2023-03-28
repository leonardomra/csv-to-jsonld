import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDropAreaComponent } from './app-drop-area.component';

describe('AppDropAreaComponent', () => {
  let component: AppDropAreaComponent;
  let fixture: ComponentFixture<AppDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
