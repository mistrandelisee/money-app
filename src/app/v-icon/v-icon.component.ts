import { Component ,Input} from '@angular/core';
import { AppManageService } from '../app-manage.service';

@Component({
  selector: 'app-v-icon',
  templateUrl: './v-icon.component.html',
  styleUrls: ['./v-icon.component.css']
})
export class VIconComponent {
  @Input() vclass: string='slds-icon slds-icon_x-small';
  @Input() vhref: string='';


  constructor(private appmanage : AppManageService){}

  get _href(): string{
    const link= this.appmanage.baseRef+''+this.vhref
    return link
  }
}
