import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDropAreaComponent } from './institution-drop-area.component';

describe('InstitutionDropAreaComponent', () => {
  let component: InstitutionDropAreaComponent;
  let fixture: ComponentFixture<InstitutionDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
