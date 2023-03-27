import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// PrimeNG components
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

// Drag and drop module
import { NgxFileDropModule } from 'ngx-file-drop';
import { AgGridTableComponentComponent } from './ag-grid-table-component/ag-grid-table-component.component';
import { AgGridModule } from 'ag-grid-angular';
import { ImageCellRendererComponent } from './ag-grid-table-component/image-cell-renderer.component';
import { CustomHeaderComponent } from './ag-grid-table-component/custom-header.component';
import { TableInjectorComponent } from './table-injector/table-injector.component';
import { TableDataService } from './table-data.service';


@NgModule({
  declarations: [
    AppComponent,
    AgGridTableComponentComponent,
    ImageCellRendererComponent,
    CustomHeaderComponent,
    TableInjectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    NgxFileDropModule,
    AgGridModule.withComponents([ImageCellRendererComponent, CustomHeaderComponent])
  ],
  providers: [TableDataService],
  bootstrap: [AppComponent],
  entryComponents: [ImageCellRendererComponent, CustomHeaderComponent]
})
export class AppModule { }
