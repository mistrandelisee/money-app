import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { TestfireComponent } from './testfire/testfire.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { TransfertComponent } from './transfert/transfert.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransfertDetailsComponent } from './transfert-details/transfert-details.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'sign', component: RegisterComponent },
  { path: 'test', component: TestfireComponent },
  { path: 'city', component: AdminCityComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'transfert', component: TransfertComponent },
  { path: 'transfert/:id', component: TransfertDetailsComponent },
  { path: 'transaction/:id', component: TransactionDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
