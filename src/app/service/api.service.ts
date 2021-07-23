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
        // .set("Authorization", 'Bearer ')
        .set("Accept","application/json");
  }
  // How to send the data + Header Example is below
  // return this.http.post<any>(_apiUrl + 'update/user/profile',data,{headers: this.header});

  routeIntended(path : any = ''){
    localStorage.setItem('routeIntended',path);
  }

  // Storing the User Info Locally
  storeUserLocally(data){
    let routeIntended = localStorage.getItem('routeIntended');
    localStorage.clear();
    // localStorage.setItem('accessToken',data.data.accessToken);
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    // window.location.href="/dashboard";
    this._router.navigate([(routeIntended) ? routeIntended : '/admin/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo',JSON.stringify(data.data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.clear();
    window.location.href = environment.projectPath;
    // this._router.navigate(['/']);
  }

  // Checking the Authentication for User
  isAuthenticated(){
    // return !!localStorage.getItem('accessToken');
    return !!localStorage.getItem('userInfo');
  }

  getUserDetailsFromStorage(){
    let user = localStorage.getItem('userInfo');
    return JSON.parse(user);
  }

  adminLoginApi(formData){
    return this._http.post<any>(_apiUrl+'user/admin-login',formData);
  }

  dashboardData(){
    return this._http.get<any>(_apiUrl+'user/get-dashboard-data');
  }

  // customer Api
  customerList() {
    return this._http.get<any>(_apiUrl+'user/list');
  }
  customerCreate(formdata){
    return this._http.post<any>(_apiUrl + 'user/add',formdata);
  }
  customerDetail(customerId){
    return this._http.get<any>(_apiUrl+'user/get/'+customerId);
  }
  customerUpdate(formData,customerId){
    return this._http.patch<any>(_apiUrl+'user/update/'+customerId,formData);
  }
  deleteCustomer(customerId){
    return this._http.get<any>(_apiUrl+'user/delete/'+customerId);
  }


  // ticket api
  ticketList() {
    return this._http.get<any>(_apiUrl+'ticket/list');
  }
  ticketDetail(ticketId) {
    return this._http.get<any>(_apiUrl+'ticket/get/'+ticketId);
  }

  //product api
  productList() {
    return this._http.get<any>(_apiUrl+'product/list');
  }
  productDetail(productId){
    return this._http.get<any>(_apiUrl+'product/get-by-user/'+productId);
  }

  //category api
  categoryList() {
    return this._http.get<any>(_apiUrl+'category/list');
  }
  categoryCreate(formData) {
    return this._http.post<any>(_apiUrl+'category/add',formData);
  }
  categoryDetail(catId) {
    return this._http.get<any>(_apiUrl+'category/get/'+catId);
  }
  categoryUpdate(formData,catId) {
    return this._http.patch<any>(_apiUrl+'category/update/'+catId,formData);
  }
  // brand api
  brandList() {
    return this._http.get<any>(_apiUrl+'brand/list');
  }
  brandCreate(formData) {
    return this._http.post<any>(_apiUrl+'brand/add',formData);
  }
  brandDetail(brandId) {
    return this._http.get<any>(_apiUrl+'brand/get/'+brandId);
  }
  brandUpdate(formData,brandId) {
    return this._http.patch<any>(_apiUrl+'brand/update/'+brandId,formData);
  }

  //package or, subscription api
  packageList() {
    return this._http.get<any>(_apiUrl+'sub/list');
  }
  packageCreate(formData) {
    return this._http.post<any>(_apiUrl+'sub/add', formData);
  }
  packageDetail(packageId) {
    return this._http.get<any>(_apiUrl+'sub/get/'+packageId);
  }
  packageUpdate(formData,packageId) {
    return this._http.patch<any>(_apiUrl+'sub/update/'+packageId,formData);
  }
}
