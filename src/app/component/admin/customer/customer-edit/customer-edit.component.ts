import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }

  
  public customerId : any = 0;
  public customerDetail: any = {};
  public errorMessage: any = '';

  ngOnInit(): void {
    this.customerId = this._activated.snapshot.paramMap.get('customerId');
    this.getCustomerDetails(this.customerId);
  }

  getCustomerDetails(customerId) {
    this._loader.startLoader('loader');
    this._api.customerDetail(customerId).subscribe(
      res => {
        console.log(res);
        this.customerDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

}
