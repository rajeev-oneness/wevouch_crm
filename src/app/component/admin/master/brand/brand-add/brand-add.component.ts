import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
   }
  public errorMessage = '';
  public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;
  ngOnInit(): void {
    this._loader.stopLoader('loader');
    this.hasFile = false;
  }

  public brandImage;
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

  barndFormSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      // console.log(this.selectedFile);
      let mainForm = formData.form.value;
      mainForm.imageUrl = "./assets/img/brand.png";
      // mainForm.imageUrl = this.selectedFile;
      // if(this.hasFile){
      //   mainForm.imageUrl = this.selectedFile;
      // }
      this._loader.startLoader('loader');
      this._api.brandCreate(mainForm).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/brand/list']);
        },
        err => {
          this.errorMessage = "Something went wrong";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
