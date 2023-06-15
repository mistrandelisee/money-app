import { Component } from '@angular/core';
import { CITY_FUNCTION, city } from 'src/types/city';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { stypes } from 'src/types/utils/datatable';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  cities:any[]=[]
  columns:any=[
    {
      label:'Code', fieldName:'id',
      type:stypes.button
    },
    {
      label:'Name', fieldName:'name',sortable:true
    },
    {
      label:'Country', fieldName:'country',sortable:true
    },
    {
      label:'Currency', fieldName:'currency',sortable:true
    },
  ]

  get _cities():any[]{
    return this.cities?.map(function(_city){
      return {..._city,
        id: _city.id || _city.code || _city.iso3,
        country: _city.country?.name ,
        currency: _city.country?.currency ,
      }
    });
  }
  constructor(public firebase:FirebaseService, private router:Router){
    //this.firebase.users=[]
  }
  ngOnInit(): void {
    const data=city.buildGetAllCitiesRequest()
    this.firebase.callFunction(CITY_FUNCTION,data).then(
      (_data:any)=>{
        console.log(_data);
        this.cities=_data.body;
      }
    )
    .catch((err:any)=>{
      this.cities=[]
    })

  }
  public get hascities() : boolean {
    return this.cities?.length >0
  }
  onCkiclicked(row:any){
    this.goto('/city/'+row.id)
  }
  goto(pathname:string){
    this.router.navigateByUrl(pathname)
  }
}
