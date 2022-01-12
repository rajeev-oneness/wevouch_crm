import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute) { 
    this._loader.startLoader('loader');
  }
  
  public ticketId : any = 0;
  public ticketDetail: any = {};
  public supExeDetail: any = JSON.parse(localStorage.getItem('userInfo'))
  public errorMessage2: any = '';
  public selectedImg: string = '';

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
    this.ticketId = this._activated.snapshot.paramMap.get('ticketId');
    this.getTicketDetails(this.ticketId);
  }

  getTicketDetails(ticketId) {
    this._loader.startLoader('loader');
    this._api.ticketDetail(ticketId).subscribe(
      res => {
        console.log(res);
        this.ticketDetail = res;
        // Getting Log against the Ticket
        this.getTicketLogList();
        this.getTicketIssueList();
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  updateTicketStatus(formData) {
    this.errorMessage2 = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      let mainForm = formData.value;
      this._loader.startLoader('loader');
      this._api.updateTicketStatus(this.ticketId, mainForm).subscribe(
        res => {
          console.log(res);
          this._loader.stopLoader('loader');
          this.getTicketDetails(this.ticketId);
          this.Toast.fire({
            icon: 'success',
            title: 'Status updated successfully!',
          });
          const customerForm = {
            "title" : "Ticket Status Update",
            "userId": this.ticketDetail?.users?._id,
            "description" : "Dear "+this.ticketDetail?.users?.name+", we have marked your ticket no. "+this.ticketDetail?.uniqueId+" as "+formData.value.status+"."
          };
          this._api.sendNotificationToCustomer(customerForm).subscribe();
          if (formData.value.status === "ongoing") {
            const logForm: any = [];
            logForm.value = {comment: 'Wevouch got in touch with '+this.ticketDetail?.products?.brands+' Service team', logType: 'Go To Customer'};
            this.createLog(logForm);
            console.log(logForm);
          }
        },
        err => {
          this.errorMessage2 = "Something went wrong";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage2 = 'Please fill out all the details';
    }
  }
  /*********************** Ticket Logs ****************************/
  
  public ticketLogs :any = [];
  public ticketIssues :any = [];
  public srnLog :any = {};
  public errorMessage :any = '';
  public userInfo : any = JSON.parse(localStorage.getItem('userInfo'));
  @ViewChild('modalCloseButton') closeButton : ElementRef;

  getTicketLogList() {
    this._loader.startLoader('loader');
    this._api.ticketLogListByTicket(this.ticketId).subscribe(
      res => {
        console.log('logs',res);
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 700);
        });
        this.ticketLogs = res;
        this.srnLog = res.filter( (e:any) => e.comment.split(".").includes("Service request No"));
        // console.log(this.srnLog[0]._id);
        
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }
  
  getTicketIssueList() {
    this._loader.startLoader('loader');
    this._api.ticketIssueList(this.ticketId).subscribe(
      res => {
        // console.log(res);
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 700);
        });
        if (res.error === false) {
          this.ticketIssues = res.data;
        }
        console.log('issues', res);        
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

  LogType = 'Internal';
  logTypeStore(selectTag: any){
    this.LogType = selectTag.value;
  }
  userApprovalType : boolean = false;
  userApprovalSTore(approvalType: any){
    this.userApprovalType = approvalType.value;
    console.log(this.userApprovalType);
    
  }

  createLog(formData) {
    this.errorMessage = '';
    // for( let i in formData.controls ){
    //   formData.controls[i].markAsTouched();
    // }
    // if( formData?.valid ){
      let mainForm = formData.value;
      mainForm.userApproval = (mainForm.userApproval === 'true')? true : false;
      mainForm.ticketId = this.ticketId;
      mainForm.executiveId = this.userInfo._id;
      this._loader.startLoader('loader');
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
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Log is not added!'
          })
        }
      )
      if(this.LogType == 'Internal'){
        const executiveForm = {
          "title":"Log Created",
          "executiveId" : this.supExeDetail?._id, 
          "description": "New Log Created"
        };
        this._api.sendNotificationToExecutive(executiveForm).subscribe(
          res => {
            this.Toast.fire({
              icon: 'success',
              title: 'Notification sent successfully!',
            });
          }
        )
      }else if(this.LogType == 'Go To Customer'){
        const customerForm = {
          "title" : "Log Created",
          "userId": this.ticketDetail?.users?._id,
          "description" : "New Log added to the ticket assigned with product "+this.ticketDetail?.products?.name
        };
        this._api.sendNotificationToCustomer(customerForm).subscribe(
          res => {
            this.Toast.fire({
              icon: 'success',
              title: 'Notification sent successfully!',
            });
          }
        )
      }
    // }
    // else{
    //   this.errorMessage = 'Please fill out all the details';
    // }
  }
  // createLog(formData) {
  //   let mainForm = formData.value;
  //   mainForm.userApproval = (mainForm.userApproval === 'true')? true : false;
  //   console.log(formData.value);
  // }

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

  addLogModalValue = {
    comment : '',
  }
  addLogOpenModalData(){
    this.errorMessage = '';
    this.addLogModalValue.comment = '';
  }

  /**************img modal open ********/
  selectImg(imgUrl: any) {
    this.selectedImg = imgUrl;
  }

  /*********************** SRN Update Work ********************/
  public srnError = '';
  updateSRN(form){
    this.srnError = '';
    if( form?.valid ){
      const mainForm = form.value;
      this._api.updateSRNDETAILS(this.ticketId,mainForm).subscribe(
        res => {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'SRN updated successfully!'
          });
          const comment = 'Service request No.[SRN] '+form.value.srn;
          this._api.ticketLogUpdateComment(this.srnLog[0]._id, {comment}).subscribe(
            res => {
              console.log(res);
              this._api.ticketLogActive(this.srnLog[0]._id, {activeLog: true}).subscribe(
                res => {
                  console.log(res);
                  this.getTicketLogList();
                }
              );
            }, err => {
              console.log(err);
              
            }
          )
          
          const customerForm = {
            "title" : "SRN Generated",
            "userId": this.ticketDetail?.users?._id,
            "description" : 'Please keep your invoice copy & warranty card handy for a hassle free service experience'
          };
          this._api.sendNotificationToCustomer(customerForm).subscribe(
            res => {
              this.Toast.fire({
                icon: 'success',
                title: 'Notification sent successfully!',
              });
            }
          )
        },
        err => {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'SRN updated failed!'
          })
        }
      )
    }else{
      this.srnError = 'Please fill out all the details';
    }
  }

  stars: number[] = [1, 2, 3, 4, 5];

  activeLog(logId, activeLog) {
    console.log(logId, activeLog);
    
    this._api.ticketLogActive(logId, {activeLog}).subscribe(
      res => {
        console.log(res);
        this.Toast.fire({
          icon: 'success',
          title: 'Log active status changed',
        })
      }, err => {
        console.log(err);
        this.Toast.fire({
          icon: 'error',
          title: 'Failed',
        })
      }
    );
  }
  
  changeUserApproval(logId) {
    console.log(logId);
    
    this._api.ticketLogUserApproval(logId, {approved: undefined}).subscribe(
      res => {
        console.log(res);
        this.Toast.fire({
          icon: 'success',
          title: 'Approval status changed',
        })
        this.getTicketLogList()
      }, err => {
        console.log(err);
        this.Toast.fire({
          icon: 'error',
          title: 'Failed',
        })
      }
    );
  }

  resolveTicketIssue( issueId, resolved ) {
    console.log(issueId, resolved);
    this._loader.startLoader('loader');
    this._api.ticketIssueResolve(issueId, {resolved}).subscribe(
      res => {
        if (res.error === false) {
          this.Toast.fire({
            icon: 'success',
            title: res.message || 'Issue resolved',
          })
          this.getTicketIssueList();
        }
        this._loader.stopLoader('loader');

      }, err => {
        this.Toast.fire({
          icon: 'success',
          title: 'Something went wrong',
        })
        this._loader.stopLoader('loader');

      }
    )
  }
}
