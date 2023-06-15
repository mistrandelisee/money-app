import { Component,Input,Output,EventEmitter } from '@angular/core';
import { COUNTRY_FUNCTION, country } from 'src/types/country';
import { stypes } from 'src/types/utils/datatable';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent {
  countries:any[]=[]
  columns:any=[
    {
      label:'Code', fieldName:'id',
      type:stypes.button
    },
    {
      label:'Name', fieldName:'name',sortable:true
    },
    {
      label:'Currency', fieldName:'currency',sortable:true
    },
  ]

  get _countries():any[]{
    return this.countries?.map(function(_country){
      return {..._country,
        id: _country.id || _country.code || _country.iso3,
        currency: _country?.currency ,}
    });
  }
  constructor(public firebase:FirebaseService, private router:Router){
    //this.firebase.users=[]
  }
  ngOnInit(): void {
    this.getCountries()
  }
  getCountries(){
    this.countries=[]
    const data=country.buildGetAllCountriesRequest()
    this.firebase.callFunction(COUNTRY_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.countries=_data.body;
      }
    )
    .catch((err:any)=>{
      this.countries=[]
    })
  }
  public get hascountries() : boolean {
    return this.countries?.length >0
  }
  onCkiclicked(row:any){
    this.goto('/country/'+row.id)
  }
  goto(pathname:string){
    this.router.navigateByUrl(pathname)
  }


  
  openModal=false;
  public doClose(){
    this.openModal=false
    this.getCountries()
  }
}
