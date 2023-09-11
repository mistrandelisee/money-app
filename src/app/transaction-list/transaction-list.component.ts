import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { TRANSACTION_FUNCTION, transaction } from 'src/types/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  constructor(public firebase:FirebaseService){ }
  transactions:any[]=[]
  fields=[
    {
      label:'start Date',
      key:'startDate',
    },
    {
      label:'statut',
      key:'status',
    },
    ,
    {
      label:'type',
      key:'matchingType',
    },
  ]
  ngOnInit(): void {
    this.transactions=this.firebase.transactions
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data=transaction.buildGetRequests()
    this.firebase.callFunction(TRANSACTION_FUNCTION,data).then(
      (data:any)=>{

        this.transactions=data?.body;
        this.firebase.transactions=this.transactions
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })

  }
}
