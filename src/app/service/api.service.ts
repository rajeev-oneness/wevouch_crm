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
    const dateTime = Date.now(); 
    localStorage.clear();
    // localStorage.setItem('accessToken', 'accessToken1234567890adminWeVouch');
    localStorage.setItem('lastLoginTime', JSON.stringify(dateTime));
    localStorage.setItem('WEVOUCH_CRM_INFO',JSON.stringify(data));
    window.location.href = environment.dasboardPath;
    // location.reload();
    // this._router.navigate([(routeIntended) ? routeIntended : '/admin/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('WEVOUCH_CRM_INFO');
    localStorage.setItem('WEVOUCH_CRM_INFO',JSON.stringify(data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.clear();
    window.location.href = environment.projectPath;
    location.reload();
  }

  // Checking the Authentication for User
  isAuthenticated(){
    const start = JSON.parse(localStorage.getItem('lastLoginTime') || '{}');
    const interval = Date.now() - start;
    const loginSession = Math.floor(interval / 1000);
    if (loginSession <= 7200 && localStorage.getItem('WEVOUCH_CRM_INFO')) {
      return true;
    } else {
      return false;
    }
    
    // return !!localStorage.getItem('WEVOUCH_CRM_INFO');
  }

  getUserDetailsFromStorage(){
    let user = localStorage.getItem('WEVOUCH_CRM_INFO');
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
  ticketLogUpdateComment(ticketLogId, formData) {
    return this._http.patch<any>(_apiUrl+'ticket-log/update-comment/'+ticketLogId, formData);
  }
  ticketLogActive(ticketLogId, formData) {
    return this._http.patch<any>(_apiUrl+'ticket-log/activate-log/'+ticketLogId, formData);
  }
  ticketLogDelete(ticketLogId) {
    return this._http.delete<any>(_apiUrl+'ticket-log/delete/'+ticketLogId);
  }
  ticketLogUserApproval(ticketLogId, formData) {
    return this._http.patch<any>(_apiUrl+'ticket-log/user-approval/'+ticketLogId, formData);
  }

  //ticket-issue
  ticketIssueList(ticketId: any) {
    return this._http.get<any>(_apiUrl + 'ticket-issue/list/' + ticketId);
  }
  ticketIssueResolve(issuId: any, formData: any) {
    return this._http.patch<any>(_apiUrl+'ticket-issue/toggle-resolve/' + issuId, formData);
  }
  ticketIssueDelete(ticketId: any) {
    return this._http.delete<any>(_apiUrl+'ticket-issue/delete/' + ticketId);
  }
  //ticket issue comments
  ticketIssueResolveCommentGet(ticketIssueId: any) {
    return this._http.get<any>(_apiUrl+'ticket-issue-comment/list/' + ticketIssueId);
  }
  ticketIssueResolveCommentAdd(formData: any) {
    return this._http.post<any>(_apiUrl+'ticket-issue-comment/create', formData);
  }


  //support executive api
  supExeDetail(supExeId) {
    return this._http.get<any>(_apiUrl+'support-executive/get/'+supExeId);
  }
  supExeUpdate(formData,supExeId) {
    return this._http.patch<any>(_apiUrl+'support-executive/update/'+supExeId,formData);
  }
  
  changePassword(formData : any) {
    return this._http.post<any>(_apiUrl+'support-executive/change-password', formData);
    // return this._http.post<any>('https://boiling-dawn-74925.herokuapp.com/api/support-executive/change-password', formData);
  }
  
  forgetPassword(formData : any) {
    return this._http.post<any>(_apiUrl+'support-executive/forgot-password', formData);
    // return this._http.post<any>('https://boiling-dawn-74925.herokuapp.com/api/support-executive/forgot-password', formData);
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

  //notification 
  notificationList() {
    return this._http.get<any>(_apiUrl+'srvc-exec-notification/list');
  }
  notificationDelete(notificationId) {
    return this._http.delete<any>(_apiUrl+'srvc-exec-notification/delete/'+notificationId);
  }
}
