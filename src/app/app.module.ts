import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { HomeService } from "./shared/home.service";

declare var require : any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
  }


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    ChartModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService, 
    { provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
