import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

var originalURL = environment.apiUrl;
var _apiUrl = originalURL + 'api/v1/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
}
