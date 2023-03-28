import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-institution-drop-area',
  templateUrl: './institution-drop-area.component.html',
  styleUrls: ['./institution-drop-area.component.less']
})
export class InstitutionDropAreaComponent {
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
