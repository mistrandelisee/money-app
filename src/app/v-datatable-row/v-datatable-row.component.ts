import { Component,Input, Output,EventEmitter} from '@angular/core';
import { col ,stypes} from 'src/types/utils/datatable';

@Component({
  selector: 'app-v-datatable-row',
  templateUrl: './v-datatable-row.component.html',
  styleUrls: ['./v-datatable-row.component.css']
})
export class VDatatableRowComponent {
  @Input()
  vcol:col=new col();
  @Input()
  vrow:any={}
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  notify(event:any) {
    this.rowClicked.emit({...event});
  }
  onCkiclicked(){
    this.notify({...this.vrow, column: this.vcol});
  }
  get value(){
    return this.vrow[this.vcol?.fieldName] || this.vcol.value
  }

  get isbutton(){
    return this.vcol?.type==stypes.button
  }
  get _class(){
    let __class='';
    __class=__class +' ' +this.vcol._btnClass;
    // console.log('class is:: ' + __class);

    return __class
  }
}
