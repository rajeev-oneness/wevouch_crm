import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _api:ApiService,private _activated:ActivatedRoute) { }

  basePath : any = environment.basePath;
  ticketStatus = '';
  newButton = '';ongoingButton='';completedButton='';cancelledButton='';
  ngOnInit(): void {
    this.ticketStatus = localStorage.getItem('buttonClick');
    this.newButton = '';this.ongoingButton='';this.completedButton='';this.cancelledButton='';
    if(this.ticketStatus == 'new'){
      this.newButton = 'active';
    }else if(this.ticketStatus == 'ongoing'){
      this.ongoingButton = 'active';
    }else if(this.ticketStatus == 'completed'){
      this.completedButton = 'active';
    }else if(this.ticketStatus == 'cancelled'){
      this.cancelledButton = 'active';
    }
    console.log('new Ticket Status=>'+this.ticketStatus);
  }

  sidebarClick(action){
    localStorage.setItem('buttonClick',action);
  }

  
  logoutAdmin() {
    this._api.logoutUser();
  }
}
