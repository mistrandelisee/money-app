import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-v-card',
  templateUrl: './v-card.component.html',
  styleUrls: ['./v-card.component.css']
})
export class VCardComponent {
  @Input()
  info:any={};

  @Input()
  routerLink='';

  @Input()
  title=this.info?.id;

  @Input()
  keyField='';

  @Input()
  fields:any[]=[];


  public get items() : any[] {
    const self=this;
    return  this.fields.map(function(element)  {  return { ...element, value:self.info[element.key] || ''}} );
  }
}
