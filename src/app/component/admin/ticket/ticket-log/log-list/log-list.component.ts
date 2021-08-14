import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ActivatedRoute } from "@angular/router";
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  @ViewChild('modalCloseButton') closeButton : ElementRef;

  public ticketId :any = '';
  public ticketUniqueId :any = '';
  public ticketLogs :any = [];
  public errorMessage :any = '';
  public userInfo : any = JSON.parse(localStorage.getItem('userInfo'));
  
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService,private _activated:ActivatedRoute) {
    this.ticketId = this._activated.snapshot.paramMap.get('ticketId');
    this._api.ticketDetail(this.ticketId).subscribe(
      res => {
        this.ticketUniqueId = res.uniqueId;
      }
    )
    // this._loader.startLoader('loader');
  }
  
  ngOnInit(): void {
    this.getTicketLogList();
  }

  getTicketLogList() {
    this._loader.startLoader('loader');
    this._api.ticketLogListByTicket(this.ticketId).subscribe(
      res => {
        console.log(res);
        this.ticketLogs = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }
  
  createLog(formData) {
    this._loader.startLoader('loader');
    console.log(formData.value);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      const mainForm = formData.value;
      mainForm.ticketId = this.ticketId;
      mainForm.executiveId = this.userInfo._id;
      this._api.ticketLogAdd(mainForm).subscribe(
        res => {
          this.closeButton.nativeElement.click(); // to close the modal
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'Log added successfully!'
          })
          this.getTicketLogList();
        },
        err => {
          console.log(err.message)
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Log is not added!'
          })
        }
        
      )
    }
    else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

  deleteLog(ticketLogId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this log!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.ticketLogDelete(ticketLogId).subscribe(
          res => {
            console.log(res);
            this.getTicketLogList();
          }, err => {}
        )
        Swal.fire(
          'Deleted!',
          'Log deleted successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Log is safe!',
          'error'
        )
      }
    })
  }

}
