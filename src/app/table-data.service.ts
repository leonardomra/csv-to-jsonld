import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  private rowDataSubject = new BehaviorSubject<any[]>([]);
  rowData$ = this.rowDataSubject.asObservable();

  constructor() {}

  setRowData(data: any[]) {
    this.rowDataSubject.next(data);
  }
}
