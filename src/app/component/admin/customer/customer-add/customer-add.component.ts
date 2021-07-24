import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
   }
  public errorMessage = '';

  ngOnInit(): void {
    this._loader.stopLoader('loader');
  }

  customerSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.customerCreate(mainForm).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/customer/list']);
        },
        err => {
          console.log(err.message)
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}

