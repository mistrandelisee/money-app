import { Component,Input } from '@angular/core';
import { Oitem } from 'src/types/utils/form-item';

@Component({
  selector: 'app-v-output-field',
  templateUrl: './v-output-field.component.html',
  styleUrls: ['./v-output-field.component.css']
})
export class VOutputFieldComponent {
  @Input()
  vitem:Oitem=new Oitem();
  get value(){
    return this.vitem.value || '';
  }
}
