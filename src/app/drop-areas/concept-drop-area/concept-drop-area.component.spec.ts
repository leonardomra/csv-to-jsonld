import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptDropAreaComponent } from './concept-drop-area.component';

describe('ConceptDropAreaComponent', () => {
  let component: ConceptDropAreaComponent;
  let fixture: ComponentFixture<ConceptDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
