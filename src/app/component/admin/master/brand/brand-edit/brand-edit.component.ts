import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }
  
  public brandId : any = 0;
  public brandDetail: any = {};
  public errorMessage: any = '';
  public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;
  ngOnInit(): void {
    this.brandId = this._activated.snapshot.paramMap.get('brandId');
    this.getBrandDetails(this.brandId);
    this.hasFile = false;
  }

  public brandImage;

  getBrandDetails(brandId) {
    this._loader.startLoader('loader');
    this._api.brandDetail(brandId).subscribe(
      res => {
        console.log(res);
        this.brandDetail = res;
        this.brandImage = res.imageUrl;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  onSelectFile(event) {
    this.fileFormatError = '';this.hasFile = false;
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != undefined && this.selectedFile != null){
        let validFormat = ['png','jpeg','jpg'];
        let fileName = this.selectedFile.name.split('.').pop();
        let data = validFormat.find(ob => ob === fileName);
        if(data != null || data != undefined){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.brandImage = event.target.result;this.hasFile = true;
          }
          return true;
        }
        this.fileFormatError = 'This File Format is not accepted';
    }
    return false;
  }

  brandFormSubmit(formData){
    console.log(this.brandId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      let mainForm = formData.form.value;
      mainForm.imageUrl = "./assets/img/brand.png";
      // mainForm.imageUrl = this.selectedFile;
      // if(this.hasFile){
      //   mainForm.imageUrl = this.selectedFile;
      // }
      this._loader.startLoader('loader');
      this._api.brandUpdate(mainForm,this.brandId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/brand/list']);
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
