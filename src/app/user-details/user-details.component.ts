import { Component, Input } from '@angular/core';
import { map,tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(public routes:ActivatedRoute){}
  public id:string='';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.routes.paramMap
    .pipe(map(params => params.get('id')), tap(id => (this.id = id || '')))
    .subscribe(id => {
      console.log(id)
    });
  }
  get hasId():boolean{
    return !!this.id
  }

}
