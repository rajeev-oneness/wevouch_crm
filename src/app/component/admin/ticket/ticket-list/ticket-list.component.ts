import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public tickets :any = [];
  // public tickets : {data : TICKET[]};
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
    
    // this.tickets = {data : []};
  }

  ngOnInit(): void {
    this.getTicketList();
  }

  getTicketList() {
    // this.tickets.data = [];
    this._loader.startLoader('loader');
    this._api.ticketList().subscribe(
      res => {
        console.log(res);
        this.tickets = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

  deleteTicket(ticket) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.ticketDelete(ticket._id).subscribe(
          res => {
            this.getTicketList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}

// interface TICKET{
//   // _id: number,
//   name : string,
// }
