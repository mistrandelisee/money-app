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
      label:'fees',
      key:'fees',
    },
    {
      label:'amount',
      key:'amount',
    }
  ]

  get _approval():any{
    const {transfert, transaction , ...info }= this.approval;
    return { ...info, transfertId: transfert.id, amount: transfert.amount,}
  }
}
