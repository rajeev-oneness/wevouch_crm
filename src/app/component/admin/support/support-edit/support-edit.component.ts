import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-support-edit',
  templateUrl: './support-edit.component.html',
  styleUrls: ['./support-edit.component.css']
})
export class SupportEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }

  public supExeId : any = 0;
  public supExeDetail: any = {};
  public errorMessage: any = '';

  ngOnInit(): void {
    this.supExeId = this._activated.snapshot.paramMap.get('supExeId');
    this.getsupExeDetails(this.supExeId);
  }

  getsupExeDetails(supExeId) {
    this._loader.startLoader('loader');
    this._api.supExeDetail(supExeId).subscribe(
      res => {
        console.log(res);
        this.supExeDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  supExeFormSubmit(formData){
    console.log(this.supExeId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.supExeUpdate(mainForm,this.supExeId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/support-executive/list']);
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
