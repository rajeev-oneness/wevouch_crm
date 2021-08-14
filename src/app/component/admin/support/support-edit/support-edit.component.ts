import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-support-edit',
  templateUrl: './support-edit.component.html',
  styleUrls: ['./support-edit.component.css']
})
export class SupportEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService) {}

  public supExeId : any = 0;
  public supExeDetail: any = {};
  public errorMessage: any = '';
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

  ngOnInit(): void {
    this._loader.startLoader('loader');
    this.supExeDetail = JSON.parse(localStorage.getItem('userInfo'));
    this.supExeId = this.supExeDetail._id;
    this._loader.stopLoader('loader');

  }


  supportFormSubmit(formData){
    this._loader.startLoader('loader');
    console.log(this.supExeId);
    console.log(formData.value);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      const mainForm = formData.value;
      
      this._api.supExeUpdate(mainForm,this.supExeId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._api.updateUserLocally(res);
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'Profile updated successfully!'
          })
        },
        err => {
          console.log(err.message)
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }
    else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
