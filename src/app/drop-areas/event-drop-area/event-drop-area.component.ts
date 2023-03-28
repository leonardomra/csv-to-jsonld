import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-drop-area',
  templateUrl: './event-drop-area.component.html',
  styleUrls: ['./event-drop-area.component.less']
})
export class EventDropAreaComponent {
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
