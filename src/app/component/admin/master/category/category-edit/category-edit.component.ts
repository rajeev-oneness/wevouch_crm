import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }
  
  public categoryId : any = 0;
  public categoryDetail: any = {};
  public errorMessage: any = '';
  ngOnInit(): void {
    this.categoryId = this._activated.snapshot.paramMap.get('categoryId');
    this.getCategoryDetails(this.categoryId);
  }

  getCategoryDetails(categoryId) {
    this._loader.startLoader('loader');
    this._api.categoryDetail(categoryId).subscribe(
      res => {
        console.log(res);
        this.categoryDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  categoryFormSubmit(formData){
    console.log(this.categoryId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      // console.log(this.categoryId);
      
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.categoryUpdate(mainForm,this.categoryId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/category/list']);
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
