import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';

import {NglModule} from 'ng-lightning';
@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent
  ],
  imports: [
    BrowserModule,NglModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
