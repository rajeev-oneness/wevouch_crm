import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute) { 
    this._loader.startLoader('loader');
  }
  
  public ticketId : any = 0;
  public ticketDetail: any = {};

  ngOnInit(): void {
    this.ticketId = this._activated.snapshot.paramMap.get('ticketId');
    this.getTicketDetails(this.ticketId);
  }

  getTicketDetails(ticketId) {
    this._loader.startLoader('loader');
    this._api.ticketDetail(ticketId).subscribe(
      res => {
        console.log(res);
        this.ticketDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }
}
