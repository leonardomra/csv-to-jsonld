import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-location-drop-area',
  templateUrl: './location-drop-area.component.html',
  styleUrls: ['./location-drop-area.component.less']
})
export class LocationDropAreaComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;
  @Output() fileChange = new EventEmitter<any>();

  onFileSelected(event: any) {
    this.fileChange.emit(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    this.fileChange.emit(event);
  }

}
