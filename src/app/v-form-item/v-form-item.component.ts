import { Component,Input,ViewChild, ElementRef, } from '@angular/core';
import { Iitem } from 'src/types/utils/form-item';

@Component({
  selector: 'app-v-form-item',
  templateUrl: './v-form-item.component.html',
  styleUrls: ['./v-form-item.component.css']
})
export class VFormItemComponent {
  @ViewChild('item') itemCmp?:ElementRef;
  @Input()
  vitem:Iitem=new Iitem();
  _saveClicked=false;
  get iclass(){
    const cx:any={};
     cx.base= 'slds-form-element';
    (this.error)? cx.error='slds-has-error' : cx.error=''

    return Object.values(cx)?.join(' ');
  }
  get error() {
    const err1=!this.itemCmp?.nativeElement.validity.valid;
    const err2=this._saveClicked;
    return err2 && err1
  }
  get _errorText(){
    return this.vitem?.errorMessage || this.itemCmp?.nativeElement.validationMessage;
  }
  public save():any{
    this._saveClicked=true;
    return this._save();
  }
  public _save():any{
    console.log('in save')
    const item:any={}
    item[this.vitem.name]=this.itemCmp?.nativeElement.value
    return {isvalid:this.validate(), item};
  }
  public validate( ):boolean{
    console.log('in validate')
    this.itemCmp?.nativeElement.checkValidity();
    return this.itemCmp?.nativeElement.validity.valid;
  }


}
