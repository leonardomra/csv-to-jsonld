import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDropAreaComponent } from './person-drop-area.component';

describe('PersonDropAreaComponent', () => {
  let component: PersonDropAreaComponent;
  let fixture: ComponentFixture<PersonDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
