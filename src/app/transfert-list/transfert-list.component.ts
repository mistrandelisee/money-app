import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { TRANSFERT_FUNCTION, transfert } from 'src/types/transfert';

@Component({
  selector: 'app-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.css']
})
export class TransfertListComponent implements OnInit {
  constructor(public firebase:FirebaseService){
    this.firebase.transferts=[]
  }
  transferts:any[]=[]
  ngOnInit(): void {
    this.transferts=this.firebase.transferts
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data=transfert.buildGetRequests()


    this.firebase.callFunction(TRANSFERT_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.transferts=_data.body;
        this.firebase.transferts=this.transferts

      }
    )
    .catch((err:any)=>{
      //this.showErrorToast(err?.body, err?.message)
      //console.error(err);
      this.transferts=[]
    })

  }
  public get hastransferts() : boolean {
    return this.transferts?.length >0
  }

}
