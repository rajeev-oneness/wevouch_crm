import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.css']
})
export class SupportListComponent implements OnInit {

  public supExes : any = {};
  
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    this.getpPackageList();
  }

  getpPackageList() {
    this.supExes = [];
    this._loader.startLoader('loader');
    this._api.supExeList().subscribe(
      res => {
        console.log(res);
        this.supExes = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

}
