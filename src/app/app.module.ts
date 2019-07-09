import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
//import { FormControl, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartTransactionsComponent } from './pie-chart-transactions/pie-chart-transactions.component';
import { DataListComponent } from './data-list/data-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
// import { NgxLoadingModule } from 'ngx-loading';
//import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    PieChartTransactionsComponent,
    DataListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  FlexLayoutModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  FormsModule,
  AngularDateTimePickerModule,
  ReactiveFormsModule
 // MatProgressButtonsModule.forRoot(),
 // NgxLoadingModule
 // NgxSpinnerModule
  ],
  providers: [WeatherService,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
