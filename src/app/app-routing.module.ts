import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";

import { TicketListComponent } from "./component/admin/ticket/ticket-list/ticket-list.component";
import { TicketDetailComponent } from "./component/admin/ticket/ticket-detail/ticket-detail.component";
import { SupportEditComponent } from "./component/admin/support/support-edit/support-edit.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { RegistrationComponent } from "./component/auth/registration/registration.component";
import { ForgetComponent } from "./component/auth/password/forget/forget.component";
import { ChangeComponent } from "./component/auth/password/change/change.component";
import { AuthGuardService } from "./service/auth-guard.service";

const routes: Routes = [
  {path : '', component : DashboardComponent, pathMatch:'full', canActivate:[AuthGuardService],},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'password', children: [
    {path: 'forget', component: ForgetComponent},
    {path: 'change', component: ChangeComponent},
  ]},
  {path: 'support-executive', canActivate:[AuthGuardService], children:[
    {path : 'dashboard', component : DashboardComponent},
    {path: 'ticket', children: [
      {path: 'list/:ticketStatus', component: TicketListComponent},
      {path: 'detail/:ticketId', component: TicketDetailComponent},
    ]},
    {path: 'edit-profile', component: SupportEditComponent}
  ]},
  {path : '**', component : DashboardComponent, pathMatch:'full', canActivate:[AuthGuardService],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
