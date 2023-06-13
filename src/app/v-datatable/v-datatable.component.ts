import { Component,EventEmitter, Input, Output } from '@angular/core';
import { col, stypes } from 'src/types/utils/datatable';

@Component({
  selector: 'app-v-datatable',
  templateUrl: './v-datatable.component.html',
  styleUrls: ['./v-datatable.component.css']
})
export class VDatatableComponent {
  @Input()
  vcolumns:any[]=[]
  @Input()
  vdata:any[]=[]
  _vdata:any[]=[]
  get _data(){
    return this.vdata;
  }
  ngOnInit(): void {
    this._vdata=[...this.vdata]
    
  }
  dir:any={};
  get _columns():col[]{
    return this.vcolumns?.map(_col =>Object.assign(new col(), _col)) || []
  }
  @Output() rowClicked: EventEmitter<any> = new EventEmitter();
  notify(event:any) {
    this.rowClicked.emit({...event});
  }
  onCkiclicked(row:any){
    this.notify(row)
  }
  onSorted(col:any){
    //this.notify(row)
    console.log(col);

    const sortKey=col.fieldName;
    let asc;
    if (this.dir[sortKey]==undefined) {
      this.dir[sortKey]=false
    }
    this.dir[sortKey]= !this.dir[sortKey]
    // const sortDir=col.sortDir;
    console.log(this.dir);
    this._vdata=this.sortList(sortKey,[...this.vdata],this.dir[sortKey])
    // this._vdata=[]
  }
  sortList(key:string, items:any[], asc=true){
    // console.log('in items');
    // console.log(items);

    let sortedItems = items.sort(
      function(a, b) {
        let v1:string = <string>a[key] || ''
        // console.log(v1);
        let v2:string =<string>  b[key] || ''
        // console.log(v2);
        v1=v1.toLocaleLowerCase();
        v2=v2.toLocaleLowerCase();
        let out:number=0;
        if (v1 > v2) {
          out= asc ? 1 : -1;
        }
        if (v1 < v2) {
          out= asc ? -1 : 1;
        }

        // console.log('out>>> ',out);

        return out;
      }
    )
    // console.log('out sortedItems');
    // console.log(sortedItems);
    // console.log(items);

    return sortedItems;
  }
  trackItem(index: number, item: any) {
    return item.name;
  }
}
