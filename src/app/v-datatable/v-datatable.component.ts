import { Component,EventEmitter, Input, Output } from '@angular/core';
import { col } from 'src/types/utils/datatable';

@Component({
  selector: 'app-v-datatable',
  templateUrl: './v-datatable.component.html',
  styleUrls: ['./v-datatable.component.css']
})
export class VDatatableComponent {

  @Input() vcolumns:any[]=[]
  @Input() vdata:any[]=[]//all incoming data
  @Input() title='';

  @Output() rowClicked: EventEmitter<any> = new EventEmitter();

  _vdata:any[]=[]//data filtered(temporary data depending of the search)
  dir:any={};
  isLoading:boolean=false;
  startIndex = 0;
  lastIndex = 0;
  pageSize = 5;
  searchTerm='';
  get existElements(){
        return this.vdata.length > 0 ? true : false;
  }
  get hastitle():boolean{ return !! this.title }
  get _title(){ return `${this.title|| 'Total Elements'} (${this._vdata?.length})` }
  get _data(){ return this.vdata; }
  get _columns():col[]{ return this.vcolumns?.map(_col =>Object.assign(new col(), _col)) || [] }
  get _searchableColumns():string[]{
    return this._columns?.filter(_column => _column.searcheable).map(_col => _col.fieldName);
  }
  get showPagination(){
      return (this.existElements && this._vdata.length > this.pageSize ) ? true : false;
  }
  get isFirstIndex() {
        return this.startIndex == 0;
    }

    get isLastIndex() {
        return this._vdata.length == this.lastIndex;
    }

    get dataToDisplay() { // data o displayon the current view
        let begin = this.startIndex;
        let end = Math.min(this._vdata.length, this.lastIndex);
        return this._vdata.slice(begin, end);
    }

    set dataToDisplay(data) {
        let clonedData = [...this._vdata];

        let begin = this.startIndex;
        let end = Math.min(this.vdata.length, this.lastIndex);
        clonedData.splice(begin, end - begin, data);
        this._vdata = clonedData.flat();
    }
  get options() {
    return [
        { label: '5 per page', value: '5' },
        { label: '8 per page', value: '8' },
        { label: '10 per page', value: '10' },
    ];
}

    get navigationState(){
      const total=Math.ceil((this._vdata?.length||0)/(this.pageSize||1))
      const curent=Math.floor((this.lastIndex||0)/(this.pageSize||1))

      return `${curent}/${total}`
    }

  ngOnInit(): void {
    this._vdata=[...this.vdata]
    this.initPaginations()
  }

  notify(event:any) {
    this.rowClicked.emit({...event});
  }
  onCkiclicked(row:any){
    this.notify(row)
  }
  onSorted(col:any){
    console.log(col);
    const sortKey=col.fieldName;
    if (this.dir[sortKey]==undefined) {
      this.dir[sortKey]=false
    }
    this.dir[sortKey]= !this.dir[sortKey]

    console.log(this.dir);
    this.dataToDisplay=this.sortList(sortKey,[...this.dataToDisplay],this.dir[sortKey])
  }
  sortList(key:string, items:any[], asc=true){
    let sortedItems = items.sort(
      function(a, b) {
        let v1:string = <string>a[key] || ''
        let v2:string =<string>  b[key] || ''
        v1=v1.toLocaleLowerCase();
        v2=v2.toLocaleLowerCase();
        let out:number=0;

        if (v1 > v2) out= asc ? 1 : -1;
        if (v1 < v2) out= asc ? -1 : 1;

        return out;
      }
    )
    return sortedItems;
  }
  trackItem(index: number, item: any) {
    return item.name;
  }

  onSearch(event:any){
    this.isLoading=true
    console.log(event.value);
    this._vdata = this.search(this.vdata,event.value);
    this.initPaginations()
    setTimeout(() => {
      this.isLoading=false
    }, 1000);

  }
  search(data:any[],term:string){
    const self=this;
    return data.filter(item=>self.founded(item,term));
  }
  founded(row:any,term:any):boolean{
    const props=[...this._searchableColumns]
    for (let index = 0; index < props.length; index++) {
      const pro = props[index];
      if (this._founded(row,pro,term))  return true;
    }
    return false;
  }
  _founded(row:any,prop:string,term:any):boolean{
    term+='';
    try {
      const value=row[prop]+'';
      return value.toLocaleLowerCase().includes(term.toLocaleLowerCase());
    } catch (error) {
      return false;
    }


  }
  handleNext() {
        this.startIndex = this.lastIndex;
        this.lastIndex = Math.min(this._vdata.length, this.lastIndex + this.pageSize);
  }

  handlePrev() {
      this.lastIndex = this.startIndex;
      this.startIndex = Math.max(0, this.startIndex - this.pageSize);
  }

  pageChange(event: any) {
    console.log(event);
    this.pageSize= +event.value || 20
    this._vdata=[...this.vdata]
    this.initPaginations()
  }
  initPaginations() {
    this.startIndex = 0;
    this.lastIndex = Math.min(this._vdata?.length || 0, this.pageSize || 0);
    this.searchTerm=''
  }
}
