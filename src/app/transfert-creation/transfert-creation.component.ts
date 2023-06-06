import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-transfert-creation',
  templateUrl: './transfert-creation.component.html',
  styleUrls: ['./transfert-creation.component.css']
})
export class TransfertCreationComponent {
  public cities: any[]=[];
  public _transfert:any={}

  public reset(){
    this._transfert={
      "status": "NEW",
      "amount":5000,
      "description":"test",
      "amountMax":10000,
      "amountMin":0,
      "createdDate":"20-04-2023",
      "LastTimeInPending":"20-04-2023",
      "to_bank": true,// ["Bank","personnel"],
      "bank":{
        "number":"xxxxxx",
        "name":"test Bank",
        "title":"test test",
        "typeId":"xxxxxxxx",
      },
      "receiver":{
        "fullname":"test",
        "numID":545455
      },
      "deposit":{
        "contact":658778542,
      },

      "ownerId":"xxxxxxxxx",
      "inZoneId":"xxxxxxxxx",
      "outZoneId":"xxxxxxxxx",
      "inZone":{
        "id":"",
        "name":"",
        "code":"",
        "country_id":"",
        "country":{
          "nom":"",
          "code":"",
          "currency":""
        }
      },
      "outZone":{
        "id":"",
        "name":"",
        "code":"",
        "country_id":"",
        "country":{
          "nom":"",
          "code":"",
          "currency":""
        }
      },
    }
  }
  constructor(public firebase:FirebaseService){

  }
  ngOnInit(): void {
    this.reset()
    this.cities=this.initCities()||[]
    this.getIncities();


  }
  savelocal(id:string){
    this._transfert.id=id
    this.firebase.transferts.push(this._transfert)
    this.reset()
  }
  public SaveTransfert(){

    this._transfert.currency=this._transfert.inZone.country.currency;
    this._transfert.inZoneId=this._transfert.inZone.country.id;
    this._transfert.outZoneId=this._transfert.outZone.country.id;

    this._transfert.createdDate= new Date().toJSON();
    this._transfert.LastTimeInPending= new Date().toJSON();
    console.log(this._transfert);
    (this._transfert.to_bank)?
      this._transfert.receiver=null: this._transfert.bank=null
    const data={
      "action":"SAVE",
      "transfert":  this._transfert
    }
    console.log(data);
    let id=new Date().getTime()+'';
    this.firebase.callFunction('manage_transfert',data).then(
      (result:any)=>{
        console.log(result);
        id=result.body;
        // this._transfert={};
      }
    )
    .catch(err=>{
      console.error(err);
    })
    .finally(() => {
      this.savelocal(id);

    })

  }

  getIncities() {
      const data={
          "action":"GET"
        }
      this.firebase.callFunction('manage_city',data).then(
        (resp:any)=>{
          console.log(resp);
          this.cities=resp.data?.body;
        }
      )
      .catch((err:any)=>{
        console.error(err);
      })
  }
  public cityChange(event:any):void {
    const city_name=event.target.value
    const zonekey=event.target.dataset.key
    console.log(zonekey);
    const zone=this.cities.find(x=> x.name === city_name)||{}

    this._transfert[zonekey]=zone;

  }
  initCities(){
    return [
      {
        id: '0111111',
        name: 'Paris',
        code: 'Paris-FRA',
        country:{
          id: 'EUR',
          currency: 'EUR',
          name: 'France',
        }
      },
      {
        id: '0111112',
        name: 'Marseille',
        code: 'Marseille-FRA',
        country:{
          id: 'EUR',
          currency: 'EUR',
          name: 'France',
        }
      },
      {
        id: '0111113',
        name: 'Douala',
        code: 'Douala-CMR',
        country:{
          id: 'XAF',
          currency: 'XAF',
          name: 'Cameroon',
        }
      },
      {
        id: '011114',
        name: 'Yaounde',
        code: 'Yaounde-CMR',
        country:{
          id: 'XAF',
          currency: 'XAF',
          name: 'Cameroon',
        }
      },

      {
        id: '011115',
        name: 'California',
        code: 'California-USD',
        country:{
          id: 'USD',
          currency: 'USD',
          name: 'Unites States',
        }
      },


    ]
  }

}
