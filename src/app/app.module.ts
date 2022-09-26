import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/admin/layouts/header/header.component';
import { FooterComponent } from './component/admin/layouts/footer/footer.component';
import { SidebarComponent } from './component/admin/layouts/sidebar/sidebar.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';

import { TicketListComponent } from './component/admin/ticket/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './component/admin/ticket/ticket-detail/ticket-detail.component';

import { SupportEditComponent } from './component/admin/support/support-edit/support-edit.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';
import { ForgetComponent } from './component/auth/password/forget/forget.component';
import { ChangeComponent } from './component/auth/password/change/change.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CommonModule } from "@angular/common";
import { FormsModule , ReactiveFormsModule, FormControl} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LogListComponent } from './component/admin/ticket/ticket-log/log-list/log-list.component';
import { LogAddComponent } from './component/admin/ticket/ticket-log/log-add/log-add.component';
import { LogDetailComponent } from './component/admin/ticket/ticket-log/log-detail/log-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { NotificationListComponent } from './component/admin/notification/notification-list/notification-list.component';
import { ActiveCustomerComponent } from './component/admin/customer/active-customer/active-customer.component';
import { InactiveCustomerComponent } from './component/admin/customer/inactive-customer/inactive-customer.component';
import { TicketPipe } from './pipes/ticket.pipe';


@NgModule({
  declarations: [
    AppComponent,HeaderComponent,FooterComponent,SidebarComponent,DashboardComponent,TicketListComponent,TicketDetailComponent,LoginComponent,RegistrationComponent,ForgetComponent,ChangeComponent, SupportEditComponent, LogListComponent, LogAddComponent, LogDetailComponent, NotificationListComponent, ActiveCustomerComponent, InactiveCustomerComponent, TicketPipe,
  ],
  imports: [
    BrowserModule,AppRoutingModule,NgxUiLoaderModule,CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
