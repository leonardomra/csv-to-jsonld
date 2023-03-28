import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactDropAreaComponent } from './artifact-drop-area.component';

describe('ArtifactDropAreaComponent', () => {
  let component: ArtifactDropAreaComponent;
  let fixture: ComponentFixture<ArtifactDropAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactDropAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactDropAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
