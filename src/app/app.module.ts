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


@NgModule({
  declarations: [
    AppComponent,HeaderComponent,FooterComponent,SidebarComponent,DashboardComponent,TicketListComponent,TicketDetailComponent,LoginComponent,RegistrationComponent,ForgetComponent,ChangeComponent, SupportEditComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    NgxUiLoaderModule,CommonModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
