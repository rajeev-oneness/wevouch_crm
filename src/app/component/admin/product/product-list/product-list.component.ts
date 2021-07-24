import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService, private _router:Router) { 
    this._loader.startLoader('loader');
  }

  public productList: any = [];

  ngOnInit(): void {
    this._loader.startLoader('loader');
    this.getProductList();
  }

  getProductList() {
    this._api.productList().subscribe(
      res => {
        console.log(res);
        this.productList = res;
        this._loader.stopLoader('loader');
      }
    )
  }

  deleteProduct(productId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.productDelete(productId).subscribe(
          res => {
            this.getProductList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}
