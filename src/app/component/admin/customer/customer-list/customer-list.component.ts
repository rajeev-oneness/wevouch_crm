import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader : NgxUiLoaderService, private _router:Router) {
    this._loader.startLoader('loader');
  }
  
  public customerList : any = [];
 

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    this._loader.startLoader('loader');
    this._api.customerList().subscribe(
      res => {
        this.customerList = res;
        console.log(this.customerList);
        this._loader.stopLoader('loader');
      },err => {}
    )
  }

  deleteCustomer(customerId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.customerDelete(customerId).subscribe(
          res => {
            this.getCustomerList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}
