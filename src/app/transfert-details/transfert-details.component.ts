import { Component, OnInit } from '@angular/core';
import { Routes ,ActivatedRoute} from '@angular/router';

import { map,tap } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-transfert-details',
  templateUrl: './transfert-details.component.html',
  styleUrls: ['./transfert-details.component.css']
})
export class TransfertDetailsComponent implements OnInit {
  constructor(public routes:ActivatedRoute, private firebase:FirebaseService){}
  public id:string='';
  public transfert:any={}
  public get title() : string {
    return `${this.transfert?.inZone.country.name} --> ${this.transfert?.outZone?.country?.name}` || this.transfert?.id
   }
  public get ownerProps() : any[] {
    return Object.entries(this.transfert?.owner|| {});
  }
  public  buildProps(prop:string) : any[] {
    return Object.entries(this.transfert[prop]|| {});
  }
  public get transfProps() : any[] {
    return Object.entries({...this.transfert,owner:'',bank:'',inZone:'',outZone:'',receiver:'',deposit:'',}|| {});
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.routes.paramMap
    .pipe(map(params => params.get('id')), tap(id => (this.id = id || '')))
    .subscribe(id => {
      this.getTransfert()
    });
  }
  public getTransfert(){
    this.transfert= this.firebase.transferts.find(x=>x.id==this.id);
    const data={
      "action":"GET",
      "search": {
        id:this.id
      }
    }
    this.firebase.callFunction('manage_transfert',data).then(
      (resp:any)=>{
        console.log(resp);
        if(resp.data?.body?.length > 0)
          this.transfert= resp.data?.body[0]
          else
          this.transfert={}
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })
  }


}
