import { NgModule ,enableProdMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';

import {NglModule} from 'ng-lightning';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestfireComponent } from './testfire/testfire.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { TransfertComponent } from './transfert/transfert.component';
import { TransfertCreationComponent } from './transfert-creation/transfert-creation.component';
import { TransfertDetailsComponent } from './transfert-details/transfert-details.component';
import { TransfertListComponent } from './transfert-list/transfert-list.component';
import { TransfertCardComponent } from './transfert-card/transfert-card.component';

enableProdMode();
@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TestfireComponent,
    AdminCityComponent,
    TransfertComponent,
    TransfertCreationComponent,
    TransfertDetailsComponent,
    TransfertListComponent,
    TransfertCardComponent
  ],
  imports: [
    BrowserModule,NglModule,FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
