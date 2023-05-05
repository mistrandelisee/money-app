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
  }


}
