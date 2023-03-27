import { Component, OnInit, ViewChild } from '@angular/core';
import { TableDataService } from '../table-data.service';
import { AgGridTableComponentComponent } from '../ag-grid-table-component/ag-grid-table-component.component';


@Component({
  selector: 'app-table-injector',
  templateUrl: './table-injector.component.html',
  styleUrls: ['./table-injector.component.less'],
})
export class TableInjectorComponent implements OnInit {
  rowData: any[];
  @ViewChild(AgGridTableComponentComponent, { static: false }) agGridComponent!: AgGridTableComponentComponent;

  constructor(private tableDataService: TableDataService) {}

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

  /*
  convertToJSONLD() {
    console.log('this.agGridComponent.agGrid:', this.agGridComponent);
    const columnDefs = this.agGridComponent.agGrid.columnApi.getAllDisplayedColumns();
    const jsonLDData = this.rowData.map((row: any) => {
      const newRow = {};
      columnDefs.forEach((colDef) => {
        const field = colDef.getColDef().field;
        const headerComponentParams = colDef.getColDef().headerComponentParams;
        const selectedOption = headerComponentParams ? headerComponentParams.selectedOption : null;
        if (selectedOption && selectedOption !== 'ignore') {
          newRow[selectedOption] = row[field];
        }
      });
      return newRow;
    });
    console.log('JSON-LD Data:', jsonLDData);
  }
  */
  
  convertToJSONLD() {
    console.log('this.agGridComponent.agGrid:', this.agGridComponent);
    const columnDefs = this.agGridComponent.agGrid.columnApi.getAllDisplayedColumns();
    const jsonLDData = this.rowData.map((row: any) => {
      const newRow = {};
      columnDefs.forEach((colDef) => {
        const field = colDef.getColDef().field;
        const headerComponentParams = colDef.getColDef().headerComponentParams;
  
        if (headerComponentParams) {
          const selectedOption = headerComponentParams.selectedOption;
          const selectedPropertyType = headerComponentParams.selectedPropertyType;
  
          if (selectedOption === 'custom') {
            if (selectedPropertyType) {
              newRow[selectedPropertyType] = row[field];
            }
          } else {
            if (selectedOption) {
              newRow[selectedOption] = row[field];
            }
          }
        }
      });
      return newRow;
    });
    console.log('JSON-LD Data:', jsonLDData);
  }
  
  
}
