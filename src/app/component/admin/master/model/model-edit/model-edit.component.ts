import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.css']
})
export class ModelEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) {
    // this._loader.startLoader('loader');
   }

  public modelId : any = 0;
  public modelDetail: any = {};
  public categoryData: any = '';
  public category_id: any = '';
  public subCategoryData: any = '';
  public brandData: any = '';
  public errorMessage: any = '';
  public fileFormatError = '';   
  ngOnInit(): void {
    // this._loader.startLoader("loader");
    this._loader.startLoader('loader');
    this.modelId = this._activated.snapshot.paramMap.get('modelId');
    console.log(this.modelId)
    this.getmodelDetail(this.modelId);
    this.getCategoryData();
    this.getBrandData();
  }

  getCategoryData() {
    this._api.categoryList().subscribe(
      res => {
        console.log('categories',res);
        this.categoryData = res.filter((t) => t.status === 'active');
      },err => {} 
    )
  }
  getSubcategoryData() {
    this._api.subCategoryListByCategoryId(this.category_id).subscribe((res) => {
      this.subCategoryData = res.filter((t) => t.status === 'active');
    });
  }
  getBrandData() {
    this._api.brandList().subscribe(
      res => {
        this.brandData = res.filter((t) => t.status === 'active');
        console.log('brands',this.brandData);
        
      },err => {} 
    )
  }

  getmodelDetail(modelId) {
    this._loader.startLoader('loader');
    this._api.modelDetail(modelId).subscribe(
      res => {
        this.modelDetail = res;
        this.category_id = res.category._id;
        this.getSubcategoryData();
        console.log(this.modelDetail);
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  modelFormSubmit(formData){
    console.log(this.modelId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      console.log(formData.value);
      
      let mainForm = formData.value;
      this._loader.startLoader('loader');
      this._api.modelUpdate(mainForm,this.modelId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/model/list']);
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
