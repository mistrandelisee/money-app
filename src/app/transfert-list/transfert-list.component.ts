import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.css']
})
export class TransfertListComponent implements OnInit {
  constructor(public firebase:FirebaseService){ }
  transferts:any[]=[]
  ngOnInit(): void {
    this.transferts=this.firebase.transferts
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data={
      "action":"GET"
    }
    this.firebase.callFunction('nlManageRequest',data).then(
      (resp:any)=>{
        console.log(resp);
        this.transferts=resp.data?.body;
        this.firebase.transferts=this.transferts
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })

  }
  /*public get transferts() : any[] {
    return this.firebase.transferts || [];
  }*/

}
