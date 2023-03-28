import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-drop-area',
  templateUrl: './app-drop-area.component.html',
  styleUrls: ['./app-drop-area.component.less']
})
export class AppDropAreaComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;
  @Output() fileChange = new EventEmitter<any>();
  @ViewChild('dropArea', { static: false }) dropArea: ElementRef;

  @Input() entityType: string;

  constructor(private renderer: Renderer2) {}

  onFileSelected(event: any) {
    this.fileChange.emit(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.renderer.addClass(this.dropArea.nativeElement, 'drop-area-hover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.renderer.removeClass(this.dropArea.nativeElement, 'drop-area-hover');
  }

  onDrop(event: any) {
    event.preventDefault();
    this.fileChange.emit(event);
    this.renderer.removeClass(this.dropArea.nativeElement, 'drop-area-hover');
  }
}
