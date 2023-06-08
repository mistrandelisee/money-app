import { Component, OnInit } from '@angular/core';
import { Routes ,ActivatedRoute} from '@angular/router';

import { map,tap } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  constructor(public routes:ActivatedRoute, private firebase:FirebaseService){}
  public id:string='';
  public transaction:any={}
  public items:any[]=[]
  public get title() : string {
    return `${this.transaction?.code} `
   }
  public get ownerProps() : any[] {
    return Object.entries(this.transaction?.owner|| {});
  }
  public  buildProps(obj:any) : any[] {
    return Object.entries(obj|| {});
  }
  public get transfProps() : any[] {
    return Object.entries({...this.transaction}|| {});
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.routes.paramMap
    .pipe(map(params => params.get('id')), tap(id => (this.id = id || '')))
    .subscribe(id => {
      this.gettransaction()
    });
  }
  public gettransaction(){
    this.transaction= this.firebase.transactions.find(x=>x.id==this.id);
    const data={
      "action":"GET-INFO",
      "code":  this.id
    }
    this.firebase.callFunction('manage_transaction',data).then(
      (data:any)=>{
        console.log(data);
        if(!! data?.body)
          {this.transaction= data?.body.transaction;
          this.items= data?.body.approvals}
          else
          this.transaction={}
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })
  }

}
