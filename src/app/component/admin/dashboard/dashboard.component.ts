import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _loader: NgxUiLoaderService) {
    this._loader.startLoader('loader');
    setTimeout(() => {
      this._loader.stopLoader("loader"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 5000);
  }
  ngOnInit(): void {
  }

}
