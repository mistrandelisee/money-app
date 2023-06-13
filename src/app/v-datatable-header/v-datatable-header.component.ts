import { Component,Input,Output,EventEmitter } from '@angular/core';
import { col } from 'src/types/utils/datatable';

@Component({
  selector: 'app-v-datatable-header',
  templateUrl: './v-datatable-header.component.html',
  styleUrls: ['./v-datatable-header.component.css']
})
export class VDatatableHeaderComponent {
  @Input()
  vcol:col=new col();
  _vcol:col=new col();
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._vcol=this.vcol
  }
  asc:boolean=false;
  @Output() sort: EventEmitter<any> = new EventEmitter();
  notify(event:any) {
    this.asc= !this.asc
    console.log(this.asc);
    
    this.sort.emit({...event,asc:this.asc});
  }
  onCkiclicked(event:any){
    this.notify(this.vcol)
    event.preventDefault()
  }
}
