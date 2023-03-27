// custom-header.component.ts
import { Component, OnInit } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community';

interface ExtendedColDef extends ColDef {
  isRowNumberColumn?: boolean;
}

@Component({
  selector: 'app-custom-header',
  template: `
    <div class="header-row">
      <div class="header-top">
        <div class="header-text" (click)="onSortRequested($event)">
          {{ params.displayName }}
          <span *ngIf="params.column.isSortAscending()" class="sort-icon">▲</span>
          <span *ngIf="params.column.isSortDescending()" class="sort-icon">▼</span>
        </div>
        <div *ngIf="!isRowNumbersColumn()" class="filter-icon" (click)="onFilterButtonClicked($event)">⚙️</div>
      </div>
      <select [(ngModel)]="selectedMapping" *ngIf="!isRowNumbersColumn()" (change)="onMappingChange($event)" (mousedown)="stopPropagation($event)">
        <option *ngFor="let option of mappingOptions" [value]="option.value">{{ option.label }}</option>
      </select>
      <select [(ngModel)]="selectedPropertyType" *ngIf="showPropertyTypesSelector()" (change)="onPropertyTypeChange($event)" (mousedown)="stopPropagation($event)">
        <option *ngFor="let option of propertyTypes" [value]="option.value">{{ option.label }}</option>
      </select>
    </div>
  `,
  styles: [
    `
    :host {
      width: 100%;
    }
    .header-row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
      /*height: 100px;*/
      width: 100%;
    }

    .header-top {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .header-text {
      cursor: pointer;
    }

    .sort-icon {
      margin-left: 5px;
    }

    .filter-icon {
      cursor: pointer;
      margin-left: 5px;
    }

    select {
      margin-top: 5px;
      width: 100%;
      box-sizing: border-box;
    }
    `,
  ],
})
export class CustomHeaderComponent implements OnInit, IHeaderAngularComp {
  
  params: IHeaderParams;
  mappingOptions = [
    { label: 'Ignore Column', value: 'ignore' },
    { label: 'Title', value: 'title' },
    { label: 'Description', value: 'description' },
    { label: 'Picture', value: 'picture' },
    { label: 'Create Custom Metadata', value: 'custom' },
  ];
  propertyTypes = [
    { label: 'Information', value: 'information' },
    { label: 'Date', value: 'date' },
    { label: 'GPS', value: 'gps' },
    { label: 'Boolean', value: 'boolean' },
    { label: 'Text', value: 'text' },
  ];
  selectedMapping: string = this.mappingOptions[0].value;
  selectedPropertyType: string = this.propertyTypes[0].value;
  
  ngOnInit(): void {
    this.onPropertyTypeChange({ target: { value: this.selectedPropertyType } });
  }
  
  agInit(params: IHeaderParams): void {
    this.params = params;
    const colDef = this.params.column.getColDef();
    if (colDef.headerComponentParams && colDef.headerComponentParams.selectedPropertyType) {
      this.selectedPropertyType = colDef.headerComponentParams.selectedPropertyType;
    }
  }

  showPropertyTypesSelector(): boolean {
    const colDef = this.params.column.getColDef();
    return colDef.headerComponentParams && colDef.headerComponentParams.selectedOption === 'custom';
  }

  isRowNumbersColumn(): boolean {
    return (this.params.column.getColDef() as ExtendedColDef).isRowNumberColumn;
  }

  onMappingChange(event: any): void {
    const selectedValue = this.selectedMapping;
    const colDef = this.params.column.getColDef();
    if (!colDef.headerComponentParams) {
      colDef.headerComponentParams = {};
    }
    colDef.headerComponentParams.selectedOption = selectedValue;
    this.params.api.refreshCells({ columns: [this.params.column], force: true });
    console.log('Selected option for column:', this.params.displayName, colDef.headerComponentParams.selectedOption);
  }

  onPropertyTypeChange(event: any): void {
    const selectedValue = this.selectedPropertyType;
    const colDef = this.params.column.getColDef();
    if (!colDef.headerComponentParams) {
      colDef.headerComponentParams = {};
    }
    colDef.headerComponentParams.selectedPropertyType = selectedValue;
    this.params.api.refreshCells({ columns: [this.params.column], force: true });
    console.log('Selected property type for column:', this.params.displayName, colDef.headerComponentParams.selectedPropertyType);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  onSortRequested(event: MouseEvent): void {
    this.params.progressSort(event.shiftKey);
  }
  
  onFilterButtonClicked(event: MouseEvent): void {
    this.params.showColumnMenu((event.target as HTMLElement));
  }
}
