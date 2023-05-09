import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

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
    const data={
      "action":"GET-LIST"
    }
    this.firebase.callFunction('manage_transaction',data).then(
      (resp:any)=>{
        console.log(resp);
        this.transactions=resp.data?.body;
        this.firebase.transactions=this.transactions
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })

  }
}
