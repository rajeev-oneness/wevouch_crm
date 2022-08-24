import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { csvJSON, htmlToCSV } from 'src/app/service/globalFunction';

@Component({
  selector: 'app-inactive-customer',
  templateUrl: './inactive-customer.component.html',
  styleUrls: ['./inactive-customer.component.css']
})
export class InactiveCustomerComponent implements OnInit {

  constructor(private _api:ApiService, private _loader : NgxUiLoaderService, private _router:Router) {
    this._loader.startLoader('loader');
  }
  
  public customerList : any = [];
  public incompleteCustomers : any = [];

  public incompleteCustomerList : boolean = false;
  selectedRowIds: Set<any> = new Set<any>();
  public searchInput: string;
  public searchInputDate: string;

  ngOnInit(): void {
    this.getCustomerList();
  }
  public tableDesign : any;
  public tableDesign2 : any;

  getCustomerList() {
    this.incompleteCustomerList = false;
    this._loader.startLoader('loader');
    this._api.customerList().subscribe(
      res => {
        
        this.customerList = res.filter((e: any) => (!e.email || !e.name) && (e.email !== 'admin@wevouch.app' && e.mobile != 9876543210));
        this.customerList.map((e: any, index: any) => e.id = index+1);
        console.log(this.customerList);
        this._loader.stopLoader('loader');
        // $(document).ready(function() {
        //   setTimeout(function(){
        //     if(this.tableDesign != undefined || this.tableDesign != null){
        //       this.tableDesign = this.tableDesign.draw();
        //     }else{
        //       this.tableDesign = $('.table').DataTable();
        //     }
        //   }, 1500);
        // });
      },err => {}
    )
  }

  reload() {
    location.reload();
  }

  deleteCustomer(customerId) {
    //
  }

  // onRowClick(id: number) {
  //   if(this.selectedRowIds.has(id)) {
  //    this.selectedRowIds.delete(id);
  //   }
  //   else {
  //     this.selectedRowIds.add(id);
  //   }
  // }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.customerList.filter((x:any) => this.selectedRowIds.has(x._id));
  }

  // selectMultiple() {

  //   if(this.selectedRowIds.size === this.customerList.length) {
  //     this.selectedRowIds.clear();
  //   } else {
  //     this._loader.startLoader('loader');
  //     this.selectedRowIds.clear();
  //     this.customerList.forEach((e:any) => {
  //       this.onRowClick(e._id);
  //     });
  //     this._loader.stopLoader('loader');
  //   }
    
  // }

  //csv function
  downloadCsv() {
    let html : any = document.querySelector("table");
    html = (<HTMLElement>html).outerHTML;
    htmlToCSV(html, "customer.csv");
  }

}
