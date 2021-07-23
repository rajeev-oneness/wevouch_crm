import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

var originalURL = environment.apiUrl;
var _apiUrl = originalURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private header;

  constructor(private _http : HttpClient,private _router : Router) { 
    this.header = new HttpHeaders()
        .set("Authorization", 'Bearer ')
        .set("Accept","application/json");
  }
  // How to send the data + Header Example is below
  // return this.http.post<any>(_apiUrl + 'update/user/profile',data,{headers: this.header});

  userLoginAPI(formData){
    return this._http.post<any>(_apiUrl+'user/login',formData);
  }

  customerList() {
    return this._http.get<any>(_apiUrl+'user/list',{headers: this.header});
  }
  customerCreate(formdata){
    return this._http.post<any>(_apiUrl + 'user/add',formdata,{headers: this.header});
  }
  // getCustomerDetails(customerId=0){
  //   return this._http.get<any>(_apiUrl + 'user/get?userId='+customerId);
  // }
  // editCustomer(customerId){
  //   return this._http.get<any>(_apiUrl+'user/update/userId='+customerId);
  // }
  ticketList() {
    return this._http.get<any>(_apiUrl+'ticket/list');
  }
  productList() {
    return this._http.get<any>(_apiUrl+'product/list');
  }
  categoryList() {
    return this._http.get<any>(_apiUrl+'category/list');
  }
  brandList() {
    return this._http.get<any>(_apiUrl+'brand/list');
  }
  packageList() {
    return this._http.get<any>(_apiUrl+'sub/list');
  }
}
