import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-person-drop-area',
  templateUrl: './person-drop-area.component.html',
  styleUrls: ['./person-drop-area.component.less']
})
export class PersonDropAreaComponent {
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
