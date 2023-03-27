import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { rowData } from '../data';
import { ImageCellRendererComponent } from './image-cell-renderer.component';
import { CustomHeaderComponent } from './custom-header.component';
import { AgGridAngular } from 'ag-grid-angular';
import { TableDataService } from '../table-data.service';
import * as XLSX from 'xlsx';
import { parse } from 'papaparse';

@Component({
  selector: 'app-ag-grid-table-component',
  templateUrl: './ag-grid-table-component.component.html',
  styleUrls: ['./ag-grid-table-component.component.less']
})
export class AgGridTableComponentComponent implements OnInit {

  @ViewChild(AgGridAngular, { static: false }) agGrid: AgGridAngular;
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  defaultColDef: any;
  rowCount: number;

  constructor(private tableDataService: TableDataService) {
    this.gridOptions = {
      //singleClickEdit: true,
      getRowHeight: (params) => {
        return this.rowHasImage(params.data) ? 100 : 40;
      },
      rowModelType: 'clientSide',
      pagination: true,
      paginationPageSize: 10,
      rowClassRules: {
        'row-number-cell': (params) => params.node.rowIndex === 0,
      },
      rowDragManaged: true,
      defaultColDef: {
        minWidth: 150,
        resizable: true,
        sortable: true,
        headerComponentFramework: CustomHeaderComponent, // Add this line
      }
    };
    this.columnDefs = [
      {
        headerName: '#',
        valueGetter: (params) => params.node.rowIndex + 1,
        width: 70,
        pinned: 'left',
        filter: false,
        sortable: false,
        editable: false,
        isRowNumberColumn: true,
      },
      {
        headerName: 'Image',
        field: 'transient.multilingual',
        valueGetter: (params) => {
          return this.getImageLocation(params.data, 'de');
        },
        cellRendererFramework: ImageCellRendererComponent,
        width: 100,
        autoHeight: true,
      },
      { field: '_id', sortable: true, filter: true, editable: true },
      { field: 'transient.multilingual.de.selectedPropertyForPicture.extra[0]', headerName: 'HALLO', sortable: true, filter: true, editable: true },
      { field: 'transient.selectedEntity.isSubject', headerName: 'Is Subject', sortable: true, filter: true, editable: true },
      { field: 'transient.selectedEntity.namespace', headerName: 'Namespace', sortable: true, filter: true, editable: true },
      { field: 'transient.selectedEntity.parent', headerName: 'Parent', sortable: true, filter: true, editable: true },
      { field: 'transient.selectedEntity.sortType', headerName: 'Sort Type', sortable: true, filter: true, editable: true },
      { field: 'transient.selectedEntity.type', headerName: 'Type', sortable: true, filter: true, editable: true }
    ];
    this.rowData = rowData;
    this.tableDataService.setRowData(this.rowData);
    this.rowCount = rowData.length;
  }

  rowHasImage(rowData: any): boolean {
    const supportedLanguages = [
      'en', 'de', 'pt', 'es', 'pl', 'hr', 'nl', 'fr', 'it', 'ru', 'tr', 'generic'
    ];
    for (const langCode of supportedLanguages) {
      const imageLocation = this.getImageLocation(rowData, langCode);
      if (imageLocation) {
        return true;
      }
    }
    return false;
  }

  getImageLocation(rowData: any, langCode: string): string | undefined {
    if (
      !rowData.transient ||
      !rowData.transient.multilingual ||
      !rowData.transient.multilingual[langCode] ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0] ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0].medium ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0].medium.metadata ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0].medium.metadata.transforms ||
      !rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0].medium.metadata.transforms[1]
    ) {
      return undefined;
    }
    const supportedLanguages = [
      'en', 'de', 'pt', 'es', 'pl', 'hr', 'nl', 'fr', 'it', 'ru', 'tr', 'generic'
    ];
    if (supportedLanguages.includes(langCode)) {
      return rowData.transient.multilingual[langCode].selectedPropertyForPicture.extra[0].medium.metadata.transforms[1].location;
    }
    return undefined;
  }


  onGridReady(params) {
    params.api.setHeaderHeight(150); // Add this line
  }

  ngOnInit() {
  }

  onCellValueChanged() {
    const updatedRowData = this.agGrid.api.getDisplayedRowCount();
    console.log(this.agGrid.api.getDataAsCsv())
    //this.tableDataService.setRowData(updatedRowData);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file.type === 'text/csv') {
      this.readCSV(file);
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    ) {
      this.readExcel(file);
    } else {
      alert('Unsupported file type');
    }
  }

  readCSV(file: File) {
    parse(file, {
      complete: (results) => {
        const data = results.data as any[][];
        const [headerRow, ...dataRows] = data;
        this.columnDefs = [
          {
            headerName: '#',
            valueGetter: (params) => (params.node.rowIndex + 1) + (this.agGrid.api.paginationGetCurrentPage() * this.agGrid.api.paginationGetPageSize()),
            width: 70,
            pinned: 'left',
            sortable: false,
            filter: false,
            editable: false,
            cellClass: 'text-center',
            isRowNumberColumn: true,
          },
          ...headerRow.map((header: any, index: number) => ({
            headerName: header,
            field: `col${index}`,
            sortable: true,
            filter: true,
            editable: true,
          })),
        ];
        // Convert the array of arrays into an array of objects
        this.rowData = dataRows.map(row => {
          const rowDataObject: any = {};
          headerRow.forEach((header, index) => {
            rowDataObject[`col${index}`] = row[index];
          });
          return rowDataObject;
        });
        this.tableDataService.setRowData(this.rowData);
        // Refresh the ag-grid with new column definitions and row data
        this.agGrid.api.setColumnDefs(this.columnDefs);
        this.agGrid.api.setRowData(this.rowData);
      },
    });
  }

  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];
      const [headerRow, ...dataRows] = data;
      // Add the row number column
      this.columnDefs = [
        {
          headerName: '#',
          valueGetter: (params) => (params.node.rowIndex + 1) + (params.api.paginationGetCurrentPage() * params.api.paginationGetPageSize()),
          width: 70,
          pinned: 'left',
          filter: false,
          sortable: false,
          editable: false,
          isRowNumberColumn: true,
        },
        ...headerRow.map((header: any) => ({
          headerName: header,
          field: header,
          sortable: true,
          filter: true,
          editable: true,
        })),
      ];
      // Convert the array of arrays into an array of objects
      this.rowData = dataRows.map(row => {
        const rowDataObject: any = {};
        headerRow.forEach((header, index) => {
          rowDataObject[header] = row[index];
        });
        return rowDataObject;
      });
      this.tableDataService.setRowData(this.rowData);
      // Refresh the ag-grid with new column definitions and row data
      this.agGrid.api.setColumnDefs(this.columnDefs);
      this.agGrid.api.setRowData(this.rowData);
    };
    reader.readAsBinaryString(file);
  }

  onPaginationChanged() {
    this.agGrid.api.refreshCells();
  }
}
