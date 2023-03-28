import { Component, OnInit, ViewChild } from '@angular/core';
import { TableDataService } from '../../table-data.service';
import { AgGridTableComponentComponent } from './../ag-grid-table-component/ag-grid-table-component.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table-injector',
  templateUrl: './table-injector.component.html',
  styleUrls: ['./table-injector.component.less'],
})
export class TableInjectorComponent implements OnInit {
  rowData: any[];
  errorMessage: string | null = null;
  entityTypeMapping = {
    'Person': 'http://schema.org/Person',
    'Artifact': 'http://schema.org/CreativeWork',
    'Concept': 'http://schema.org/Thing',
    'Event': 'http://schema.org/Event',
    'Institution': 'http://schema.org/Organization',
    'Location': 'http://schema.org/Place',
  };
  selectedEntityType: string | null = null;

  @ViewChild(AgGridTableComponentComponent, { static: false }) agGridComponent!: AgGridTableComponentComponent;

  constructor(private tableDataService: TableDataService, public dialogRef: MatDialogRef<TableInjectorComponent>) {}

  ngOnInit() {
    this.tableDataService.rowData$.subscribe((data) => {
      this.rowData = data;
    });
  }

  unflatten(obj: any) {
    let result = {};
    for (let key in obj) {
      let keys = key.split('_');
      let current = result;
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          current[keys[i]] = obj[key];
        } else {
          if (current[keys[i]] && typeof current[keys[i]] !== 'object') {
            console.warn(`Skipping key '${keys[i]}' as the current value is not an object.`);
            break;
          }
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
      }
    }
    return result;
  }
  
  convertToJSONLD() {
    const self = this;
    setTimeout(() => {
      self.errorMessage = null;
      console.log('Clearing error message');
    }, 3000);
    if (!this.agGridComponent || !this.agGridComponent.agGrid) {
      console.log('agGrid is not available yet');
      this.errorMessage = 'Please upload a file first.';
      return;
    }
    if (!this.rowData || this.rowData.length === 0) {
      console.log('No data uploaded yet');
      this.errorMessage = 'Please upload a file first.';
      return;
    }
    this.errorMessage = null;
    const columnDefs = this.agGridComponent.agGrid.columnApi.getAllDisplayedColumns();
    const jsonLDData = this.rowData.map((row: any) => {
      
      const newRow = {
        '@type': this.entityTypeMapping[this.selectedEntityType]
      };
      columnDefs.forEach((colDef) => {
        const field = colDef.getColDef().field;
        const headerComponentParams = colDef.getColDef().headerComponentParams;
        if (headerComponentParams) {
          const selectedOption = headerComponentParams.selectedOption;
          const selectedPropertyType = headerComponentParams.selectedPropertyType;
          const columnName = colDef.getColDef().headerName;
          if (selectedOption === 'custom') {
            if (selectedPropertyType) {
              newRow[columnName] = {
                originalLabel: columnName,
                label: selectedPropertyType,
                type: selectedOption,
                value: row[field]
              };
            }
          } else {
            if (selectedOption) {
              newRow[selectedOption] = {
                originalLabel: columnName,
                label: selectedOption,
                type: undefined,
                value: row[field]
              };
            }
          }
        }
      });
      return newRow;
    });
    console.log('JSON-LD Data:', jsonLDData);
    this.dialogRef.close();
  }
  
  /*
  convertToJSONLD() {
    const self = this;
    setTimeout(() => {
      self.errorMessage = null;
      console.log('Clearing error message');
    }, 3000);
    if (!this.agGridComponent || !this.agGridComponent.agGrid) {
      console.log('agGrid is not available yet');
      this.errorMessage = 'Please upload a file first.';
      return;
    }
    if (!this.rowData || this.rowData.length === 0) {
      console.log('No data uploaded yet');
      this.errorMessage = 'Please upload a file first.';
      return;
    }
    this.errorMessage = null;
    const columnDefs = this.agGridComponent.agGrid.columnApi.getAllDisplayedColumns();
    const jsonLDData = this.rowData.map((row: any) => {
      const newRow = {};
      columnDefs.forEach((colDef) => {
        const field = colDef.getColDef().field;
        const headerComponentParams = colDef.getColDef().headerComponentParams;
        if (headerComponentParams) {
          const selectedOption = headerComponentParams.selectedOption;
          const selectedPropertyType = headerComponentParams.selectedPropertyType;
          const columnName = colDef.getColDef().headerName;
          if (selectedOption === 'custom') {
            if (selectedPropertyType) {
              newRow[columnName] = {
                originalLabel: columnName,
                label: selectedPropertyType,
                type: selectedOption
              };
            }
          } else {
            if (selectedOption) {
              newRow[columnName] = {
                originalLabel: columnName,
                label: selectedOption,
                type: undefined
              };
            }
          }
        }
      });
      return newRow;
    });
    console.log('JSON-LD Data:', jsonLDData);
    this.dialogRef.close();
  }
  */
  
  injectType(type) {
    this.selectedEntityType = type;
  }
  
  
}
