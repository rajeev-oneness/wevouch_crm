import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public ticketList: any = [];

  ngOnInit(): void {
    this.getTicketList();
  }

  getTicketList() {
    this._loader.startLoader('loader');
    this._api.ticketList().subscribe(
      res => {
        console.log(res);
        this.ticketList = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }
}
