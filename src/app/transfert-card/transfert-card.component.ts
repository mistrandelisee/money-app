import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-transfert-card',
  templateUrl: './transfert-card.component.html',
  styleUrls: ['./transfert-card.component.css']
})
export class TransfertCardComponent {
 @Input()
 transfert:any={};

 public get title() : string {
  return `${this.transfert?.inZone.country.name} - ${this.transfert?.outZone?.country?.name}` || this.transfert?.id
 }
 public get id() : string {
  return  this.transfert?.id
 }

}
