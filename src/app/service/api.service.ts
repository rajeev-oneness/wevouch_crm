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
    localStorage.setItem('accessToken', 'accessToken1234567890adminWeVouch');
    localStorage.setItem('userInfo',JSON.stringify(data));
    window.location.href = environment.dasboardPath;
    // this._router.navigate([(routeIntended) ? routeIntended : '/admin/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo',JSON.stringify(data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.clear();
    window.location.href = environment.projectPath;
  }

  // Checking the Authentication for User
  isAuthenticated(){
    return !!localStorage.getItem('accessToken');
  }

  getUserDetailsFromStorage(){
    let user = localStorage.getItem('userInfo');
    return JSON.parse(user);
  }

  supExeLoginApi(formData){
    return this._http.post<any>(_apiUrl+'support-executive/login',formData);
  }

  dashboardData(formData){
    return this._http.post<any>(_apiUrl+'user/get-dashboard-data-executive',formData);
  }

  // ticket api
  ticketList() {
    return this._http.get<any>(_apiUrl+'ticket/list');
  }
  ticketListForSupportExe(formData) {
    return this._http.post<any>(_apiUrl+'ticket/list-by-executive', formData);
  }
  ticketDetail(ticketId) {
    return this._http.get<any>(_apiUrl+'ticket/get/'+ticketId);
  }
  updateTicketStatus(ticketId, formData) {
    return this._http.patch<any>(_apiUrl+'ticket/update-status/'+ticketId, formData);
  }
  //ticket-log
  ticketLogList() {
    return this._http.get<any>(_apiUrl+'ticket-log/list');
  }
  ticketLogListByTicket(ticketLogId) {
    return this._http.get<any>(_apiUrl+'ticket-log/get-by-ticket/'+ticketLogId);
  }
  ticketLogDetail(ticketLogId) {
    return this._http.get<any>(_apiUrl+'ticket-log/get/'+ticketLogId);
  }
  ticketLogAdd(formData) {
    return this._http.post<any>(_apiUrl+'ticket-log/add', formData);
  }
  ticketLogDelete(ticketLogId) {
    return this._http.delete<any>(_apiUrl+'ticket-log/delete/'+ticketLogId);
  }


  //support executive api
  supExeDetail(supExeId) {
    return this._http.get<any>(_apiUrl+'support-executive/get/'+supExeId);
  }
  supExeUpdate(formData,supExeId) {
    return this._http.patch<any>(_apiUrl+'support-executive/update/'+supExeId,formData);
  }

  sendNotificationToExecutive(formData){
    return this._http.post<any>(_apiUrl+'srvc-exec-notification/add',formData)
  }

  sendNotificationToCustomer(formData){
    return this._http.post<any>(_apiUrl+ 'notification/add',formData);
  }

  updateSRNDETAILS(ticketId,form){
    return this._http.patch<any>(_apiUrl + 'ticket/update-srn/'+ticketId, form);
  }

}
