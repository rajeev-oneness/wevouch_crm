import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sideBar') sideBar : ElementRef
  constructor(private _api:ApiService,private _activated:ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  
  currentTicketReportName = '';
  ticketComponentClick(action){
    this.currentTicketReportName = action;
  }

  
  logoutAdmin() {
    this._api.logoutUser();
  }

  hideSidebar() {
    this.sideBar.nativeElement.classList.remove('active')
  }
}
