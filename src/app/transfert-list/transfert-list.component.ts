import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.css']
})
export class TransfertListComponent implements OnInit {
  constructor(public firebase:FirebaseService,public toastservice: ToastService){
    this.firebase.transferts=[]
  }
  transferts:any[]=[]
  ngOnInit(): void {
    this.transferts=this.firebase.transferts
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data={
      "action":"GET-ALL"
    }
    this.firebase.callFunction('nlManageRequest',data).then(
      (resp:any)=>{
        console.log(resp);
        const data=resp.data;
        if (data.code!== '400') {
          this.transferts=data.body;
          this.firebase.transferts=this.transferts
        }else{
          this.showWarningToast(data?.body, data?.message)

        }

      }
    )
    .catch((err:any)=>{
      this.showErrorToast(err?.body, err?.message)
      console.error(err);
      this.transferts=[]
    })

  }
  public get hastransferts() : boolean {
    return this.transferts?.length >0
  }
  showErrorToast(title:string,body:string){
    this.toastservice.open('error',title,body)

  }
  showSuccessToast(title:string,body:string){
    this.toastservice.open('success',title,body)

  }
  showWarningToast(title:string,body:string){
    this.toastservice.open('warning',title,body)
  }

}
