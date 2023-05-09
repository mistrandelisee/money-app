import {Input, Component } from '@angular/core';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent {
  @Input() approval:any
  fields=[
    {
      label:'start Date',
      key:'startDate',
    },
    {
      label:'statut',
      key:'status',
    },
    {
      label:'isprimary',
      key:'isprimary',
    },
    {
      label:'vueClient',
      key:'vueClient',
    }
  ]
}
