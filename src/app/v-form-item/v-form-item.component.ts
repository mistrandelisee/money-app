import { Component,Input } from '@angular/core';
import { Iitem } from 'src/types/utils/form-item';

@Component({
  selector: 'app-v-form-item',
  templateUrl: './v-form-item.component.html',
  styleUrls: ['./v-form-item.component.css']
})
export class VFormItemComponent {
  @Input()
  vitem?: Iitem;



}
