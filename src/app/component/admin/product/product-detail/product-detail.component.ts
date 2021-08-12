import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) {
    this._loader.startLoader('loader');
   }

  public productId : any = 0;
  public productDetail: any = {};

  ngOnInit(): void {
    this.productId = this._activated.snapshot.paramMap.get('productId');
    this.getProductDetail(this.productId);
  }

  getProductDetail(productId) {
    this._loader.startLoader('loader');
    this._api.productDetail(productId).subscribe(
      res => {
        console.log(res);
        this.productDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

}
