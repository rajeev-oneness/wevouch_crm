import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";

import { TicketListComponent } from "./component/admin/ticket/ticket-list/ticket-list.component";
import { TicketDetailComponent } from "./component/admin/ticket/ticket-detail/ticket-detail.component";
import { LogListComponent } from "./component/admin/ticket/ticket-log/log-list/log-list.component";
import { LogAddComponent } from "./component/admin/ticket/ticket-log/log-add/log-add.component";
import { LogDetailComponent } from "./component/admin/ticket/ticket-log/log-detail/log-detail.component";
import { NotificationListComponent } from "./component/admin/notification/notification-list/notification-list.component";
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
      {path: 'list/:ticketStatus', canActivate:[AuthGuardService], component: TicketListComponent},
      {path: 'detail/:ticketId', canActivate:[AuthGuardService], component: TicketDetailComponent},
      {path: 'log', canActivate:[AuthGuardService], children: [
        {path: 'list/:ticketId', component: LogListComponent},
        {path: 'add', component: LogAddComponent},
        {path: 'detail/:ticketLogId', component: LogDetailComponent},
      ]},
    ]},
    {path: 'notification', children: [
      {path: 'list', canActivate:[AuthGuardService], component: NotificationListComponent},
    ]},
    {path: 'edit-profile', canActivate:[AuthGuardService], component: SupportEditComponent}
  ]},
  {path : '**', component : DashboardComponent, pathMatch:'full', canActivate:[AuthGuardService],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
