import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableComponentComponent } from './ag-grid-table-component.component';

describe('AgGridTableComponentComponent', () => {
  let component: AgGridTableComponentComponent;
  let fixture: ComponentFixture<AgGridTableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridTableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
