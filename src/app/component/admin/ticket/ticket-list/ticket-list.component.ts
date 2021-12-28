import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  
  public tickets :any = [];
  public ticketStatus :any = '';
  public userInfo : any = JSON.parse(localStorage.getItem('userInfo'));

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService,private _activated:ActivatedRoute) { 
    this._loader.startLoader('loader');
  }
  ngOnInit(): void {
    this._activated.paramMap.subscribe( params => {
      this.ticketStatus = params.get("ticketStatus");
      this.getTicketList(this.ticketStatus);
    });
  }

  getTicketList(ticketStatus) {
    // $('.table').DataTable().destroy();
    this._loader.startLoader('loader');
    let formData = {'status': ticketStatus, 'executiveId': this.userInfo._id};
    this._api.ticketListForSupportExe(formData).subscribe(
      res => {
        this.tickets = res.filter(
          e => (e.status == ticketStatus) && (e.users)
        );
        this._loader.stopLoader('loader');
        console.log('ticket Status',ticketStatus);
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 700);
        });
      },err => {} 
    )
  }
  
}

