import { Component, ChangeDetectorRef } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import * as Papa from 'papaparse';
import { MatDialog } from '@angular/material/dialog';
import { TableInjectorComponent } from './table-injector/table-injector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'csv-to-jsonld';
  display: boolean = false;
  csvData: any[] = null;
  columns: string[] = [];
  selectedRows: any[] = [];
  fileLoaded = false;

  constructor(private changeDetector: ChangeDetectorRef, public dialog: MatDialog) { }

  showDialog() {
    this.display = true;
    setTimeout(() => {
      this.changeDetector.detectChanges();
    }, 0);
  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type === 'text/csv') {
            this.parseCsv(file);
          } else {
            console.error('Invalid file type:', file.type);
          }
        });
      }
    }
  }

  parseCsv(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        this.csvData = results.data;
        this.columns = results.meta.fields;
        this.fileLoaded = true;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });
  }

  fileOver(event) {
    console.log('File hovered:', event);
  }

  fileLeave(event) {
    console.log('File left the drop zone:', event);
  }

  cancel() {
    this.display = false;
    this.csvData = null;
    this.columns = [];
    this.selectedRows = [];
    this.fileLoaded = false; // Reset the fileLoaded variable
  }

  convertToJsonLd() {
    const jsonLdData = this.csvData.map(row => {
      let rowJsonLd = this.unflatten(row);
      rowJsonLd['@context'] = 'https://schema.org/';
      return rowJsonLd;
    });

    console.log('JSON-LD data:', jsonLdData);

    this.display = false;
    this.csvData = null;
    this.columns = [];
    this.selectedRows = [];
  }

  unflatten(obj: any) {
    let result = {};
    for (let key in obj) {
      let keys = key.split('_');
      console.log('keys:', keys);
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

  openDialog() {
    const dialogRef = this.dialog.open(TableInjectorComponent, {
      width: '90%',
      height: '570px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
