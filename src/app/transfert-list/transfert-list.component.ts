import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ToastService } from '../toast.service';
import { TRANSFERT_FUNCTION, transfert } from 'src/types/transfert';
import { stypes } from 'src/types/utils/datatable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfert-list',
  templateUrl: './transfert-list.component.html',
  styleUrls: ['./transfert-list.component.css']
})
export class TransfertListComponent implements OnInit {
  constructor(public firebase:FirebaseService, private router:Router){
    this.firebase.transferts=[]
  }
  transferts:any[]=[]
  columns:any=[
    {
      label:'Id', fieldName:'id',
      type:stypes.button
    },
    {
      label:'Name', fieldName:'title',sortable:true
    },
    {
      label:'Amount', fieldName:'Amount',sortable:true
    },
    
    
    {
      label:'Owner', fieldName:'owner',sortable:true
    },
    {
      label:'Status', fieldName:'status',sortable:true, searchable:false
    },
  ]

  get _transferts():any[]{
    return this.transferts?.map(function(request){
      return {...request,
        title:`${request?.inZone?.country?.name || ''} -> ${request?.outZone?.country?.name|| ''}` ,//|| request?.id,
        from: request.inZone?.country?.name ,
        owner: `${(request?.owner?.firstname || request?.owner?.lastname)?((request?.owner?.firstname || '')+' '+(request?.owner?.lastname || '') ): (request?.owner?.email || '')}` ,
        to: request.outZone?.country?.name ,
        Amount: request.amount +' '+request.inZone?.country?.currency ,}
    });
  }
  ngOnInit(): void {
    this.transferts=[]//this.firebase.transferts
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
      this.transferts=[]
    })

  }
  
  public get hastransferts() : boolean {
    return this.transferts?.length >0
  }
  onCkiclicked(row:any){
    this.goto('/transfert/'+row.id)
  }
  goto(pathname:string){
    this.router.navigateByUrl(pathname)
  }

}
