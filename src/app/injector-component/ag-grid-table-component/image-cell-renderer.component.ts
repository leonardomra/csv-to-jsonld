import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-image-cell-renderer',
  template: `<img [src]="imageUrl" style="max-width: 100%; max-height: 100px; object-fit: contain;" />`
})
export class ImageCellRendererComponent implements ICellRendererAngularComp {
  imageUrl: string;

  agInit(params: any): void {
    this.imageUrl = params.value;
  }

  refresh(params: any): boolean {
    return false;
  }
}