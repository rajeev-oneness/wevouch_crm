import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-service-cen-edit',
  templateUrl: './service-cen-edit.component.html',
  styleUrls: ['./service-cen-edit.component.css']
})
export class ServiceCenEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) {
    this._loader.startLoader('loader');
   }

    public categoryData: any = '';
    public category_id: any = '';
    public subCategoryData: any = '';
    public brandData: any = '';
    public serviceCenId : any = 0;
    public serviceCenDetail: any = {};
    public errorMessage: any = '';
    public fileFormatError = '';
  //  public selectedFile : File;public hasFile : boolean;
  
  ngOnInit(): void {
    this.getCategoryData();
    this.getBrandData();
    this.serviceCenId = this._activated.snapshot.paramMap.get('serviceCenterId');
    console.log(this.serviceCenId)
    this.getserviceCenDetail(this.serviceCenId);
    //  this.hasFile = false;
  }

  getCategoryData() {
    this._api.categoryList().subscribe(
      res => {
        this.categoryData = res.filter((t) => t.status === 'active');
        console.log('categories',this.categoryData);
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

  getserviceCenDetail(serviceCenId) {
    this._loader.startLoader('loader');
    this._api.serviceCenDetail(serviceCenId).subscribe(
      res => {
        this.serviceCenDetail = res;
        console.log(this.serviceCenDetail);
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  serviceCenFormSubmit(formData){
    console.log(this.serviceCenId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      console.log(formData.value);
      
      let mainForm = formData.value;
      // mainForm.imageUrl = "./assets/img/brand.png";
      // mainForm.imageUrl = this.selectedFile;
      // if(this.hasFile){
      //   mainForm.imageUrl = this.selectedFile;
      // }
      this._loader.startLoader('loader');
      this._api.serviceCenUpdate(mainForm,this.serviceCenId).subscribe(
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
