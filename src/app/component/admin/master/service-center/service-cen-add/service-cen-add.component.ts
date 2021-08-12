import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-service-cen-add',
  templateUrl: './service-cen-add.component.html',
  styleUrls: ['./service-cen-add.component.css']
})
export class ServiceCenAddComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _router: Router) {
    this._loader.startLoader('loader');
   }

  public categoryData: any = '';
  public category_id: any = '';
  public subCategoryData: any = '';
  public brandData: any = '';
  public errorMessage: any = '';

  ngOnInit(): void {
    this.getCategoryData();
    this.getBrandData();
  }

  getCategoryData() {
    this._api.categoryList().subscribe(
      res => {
        console.log('categories',res);
        this.categoryData = res.filter((t) => t.status === 'active');
        this._loader.stopLoader('loader');
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
        console.log('brands',res);
        this.brandData = res.filter((t) => t.status === 'active');
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

  seviceCennterFormSubmit(formData){
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.seviceCennterrCreate(mainForm).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/service-center/list']);
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
