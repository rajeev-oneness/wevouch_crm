import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService, private _router:Router) { 
    this._loader.startLoader('loader');
  }

  public dashboardData :any = [];
  public issues :any = [];

  public WEVOUCH_CRM_INFO : any = JSON.parse(localStorage.getItem('WEVOUCH_CRM_INFO'));

  ngOnInit(): void {
    this.getDashboardData();
    this._api.ticketIssueLists().subscribe(
      res => {
        console.log('ticket issue',res);
        if (res.error === false) {
          this.issues = res.data.filter( (e: any) => e.ticket && e.ticket.products && e.ticket.users );
        }
      },err => {} 
    )
  }

  getDashboardData() {
    this._loader.startLoader('loader');
    let formData = {"executiveId": this.WEVOUCH_CRM_INFO._id};
    this._api.dashboardData(formData).subscribe(
      res => {
        console.log(res);
        
        this.dashboardData = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

}
