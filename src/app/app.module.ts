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
import { AgGridTableComponentComponent } from './injector-component/ag-grid-table-component/ag-grid-table-component.component';
import { AgGridModule } from 'ag-grid-angular';
import { ImageCellRendererComponent } from './injector-component/ag-grid-table-component/image-cell-renderer.component';
import { CustomHeaderComponent } from './injector-component/ag-grid-table-component/custom-header.component';
import { TableInjectorComponent } from './injector-component/table-injector/table-injector.component';
import { TableDataService } from './table-data.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AppDropAreaComponent } from './injector-component/drop-areas/app-drop-area/app-drop-area.component';
@NgModule({
  declarations: [
    AppComponent,
    AgGridTableComponentComponent,
    ImageCellRendererComponent,
    CustomHeaderComponent,
    TableInjectorComponent,
    AppDropAreaComponent
  ],
  imports: [
    MatRippleModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
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
  entryComponents: [ImageCellRendererComponent, CustomHeaderComponent, TableInjectorComponent]
})
export class AppModule { }
