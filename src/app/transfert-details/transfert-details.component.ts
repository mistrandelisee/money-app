import { Component, OnInit } from '@angular/core';
import { Routes ,ActivatedRoute} from '@angular/router';

import { map,tap } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { transfert,TRANSFERT_FUNCTION } from 'src/forms/transfert';
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
    try {
      return Object.entries(this.transfert[prop]|| {});
    } catch (error) {
      return [];
    }

  }
  public get transfProps() : any[] {
    return Object.entries({...this.transfert,owner:'',bank:'',inZone:'',outZone:'',receiver:'',deposit:''
    ,createdDate: (this.transfert?.createdDate)? JSON.stringify(this.transfert?.createdDate): null

  }|| {});
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

    const data=transfert.buildGetInfo(this.id)
    this.firebase.callFunction(TRANSFERT_FUNCTION,data).then(
      (resp:any)=>{
        console.log(resp);

        if(resp.data?.body)
          this.transfert= resp.data?.body
          else
          this.transfert={}
      }
    )
    .catch((err:any)=>{
      console.error(err);
    })
  }


}
