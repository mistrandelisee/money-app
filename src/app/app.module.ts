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
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { VCardComponent } from './v-card/v-card.component';
import { VSpinnerComponent } from './v-spinner/v-spinner.component';
import { ApprovalDetailsComponent } from './approval-details/approval-details.component';
import { VZoneComponent } from './v-zone/v-zone.component';
import { VToastComponent } from './v-toast/v-toast.component';
import { VComboboxComponent } from './v-combobox/v-combobox.component';
import { VModalComponent } from './v-modal/v-modal.component';

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
    TransfertCardComponent,
    TransactionComponent,
    TransactionDetailsComponent,
    TransactionListComponent,
    VCardComponent,
    VSpinnerComponent,
    ApprovalDetailsComponent,
    VZoneComponent,
    VToastComponent,
    VComboboxComponent,
    VModalComponent
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
