import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInjectorComponent } from './table-injector.component';

describe('TableInjectorComponent', () => {
  let component: TableInjectorComponent;
  let fixture: ComponentFixture<TableInjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableInjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
