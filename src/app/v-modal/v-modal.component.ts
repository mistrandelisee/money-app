import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-v-modal',
  templateUrl: './v-modal.component.html',
  styleUrls: ['./v-modal.component.css']
})
export class VModalComponent {
  @Input()
  voptions:any[]=[];
  @Input()
  vvalue:string=''
  @Input()
  vheight:string='500px'

  @Output() save: EventEmitter<any> = new EventEmitter();

  @Output() close: EventEmitter<any> = new EventEmitter();
  option:any={};
  public doChange(event: any):void{
    this.option=event;
  }
  public doClose(){
    this.close.emit(null);
  }
  public doSave(){
    this.save.emit(this.option);
  }
}
