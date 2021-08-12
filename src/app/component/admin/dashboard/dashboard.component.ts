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
  public userInfo : any = JSON.parse(localStorage.getItem('userInfo'));

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this._loader.startLoader('loader');
    let formData = {"executiveId": this.userInfo._id};
    this._api.dashboardData(formData).subscribe(
      res => {
        console.log(res);
        
        this.dashboardData = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

}
