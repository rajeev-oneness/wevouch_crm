import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";
import { CustomerListComponent } from "./component/admin/customer/customer-list/customer-list.component";
import { CustomerAddComponent } from "./component/admin/customer/customer-add/customer-add.component";
import { CustomerEditComponent } from "./component/admin/customer/customer-edit/customer-edit.component";
import { CustomerDetailComponent } from "./component/admin/customer/customer-detail/customer-detail.component";
import { TicketListComponent } from "./component/admin/ticket/ticket-list/ticket-list.component";
import { TicketDetailComponent } from "./component/admin/ticket/ticket-detail/ticket-detail.component";
import { ProductListComponent } from "./component/admin/product/product-list/product-list.component";
import { ProductDetailComponent } from "./component/admin/product/product-detail/product-detail.component";
import { CustomerReportListComponent } from "./component/admin/report/customer-report/customer-report-list/customer-report-list.component";
import { CustomerReportDeatilComponent } from "./component/admin/report/customer-report/customer-report-deatil/customer-report-deatil.component";
import { ProductReportListComponent } from "./component/admin/report/product-report/product-report-list/product-report-list.component";
import { ProductReportDetailComponent } from "./component/admin/report/product-report/product-report-detail/product-report-detail.component";
import { TicketReportListComponent } from "./component/admin/report/ticket-report/ticket-report-list/ticket-report-list.component";
import { TicketReportDetailComponent } from "./component/admin/report/ticket-report/ticket-report-detail/ticket-report-detail.component";
import { CategoryListComponent } from "./component/admin/master/category/category-list/category-list.component";
import { CategoryAddComponent } from "./component/admin/master/category/category-add/category-add.component";
import { CategoryEditComponent } from "./component/admin/master/category/category-edit/category-edit.component";
import { BrandListComponent } from "./component/admin/master/brand/brand-list/brand-list.component";
import { BrandAddComponent } from "./component/admin/master/brand/brand-add/brand-add.component";
import { BrandEditComponent } from "./component/admin/master/brand/brand-edit/brand-edit.component";
import { PackageListComponent } from "./component/admin/package/package-list/package-list.component";
import { PackageAddComponent } from "./component/admin/package/package-add/package-add.component";
import { PackageEditComponent } from "./component/admin/package/package-edit/package-edit.component";
import { SupportListComponent } from "./component/admin/support/support-list/support-list.component";
import { SupportAddComponent } from "./component/admin/support/support-add/support-add.component";
import { SendNotificationComponent } from "./component/admin/notification/send-notification/send-notification.component";
import { SendEmailComponent } from "./component/admin/notification/send-email/send-email.component";
import { SendSmsComponent } from "./component/admin/notification/send-sms/send-sms.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { RegistrationComponent } from "./component/auth/registration/registration.component";
import { ForgetComponent } from "./component/auth/password/forget/forget.component";
import { ChangeComponent } from "./component/auth/password/change/change.component";
const routes: Routes = [
  {path : '', component : DashboardComponent, pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'password', children: [
    {path: 'forget', component: ForgetComponent},
    {path: 'change', component: ChangeComponent},
  ]},
  {path: 'admin', children: [
    {path : 'dashboard', component : DashboardComponent},
    {path : 'customer', children: [
      {path: 'list', component: CustomerListComponent},
      {path: 'add', component: CustomerAddComponent},
      {path: 'edit/:customerId', component: CustomerEditComponent},
      {path: 'detail/:customerId', component: CustomerDetailComponent},
      {path: 'report', children: [
        {path: 'list', component: CustomerReportListComponent},
        {path: 'detail/:customerId', component: CustomerReportDeatilComponent},
      ]}
    ]},
    {path: 'ticket', children: [
      {path: 'list', component: TicketListComponent},
      {path: 'detail/:ticketId', component: TicketDetailComponent},
      {path: 'report', children: [
        {path: 'list', component: TicketReportListComponent},
        {path: 'detail/:ticketId', component: TicketReportDetailComponent},
      ]}
    ]},
    {path: 'product', children: [
      {path: 'list', component: ProductListComponent},
      {path: 'detail/:productId', component: ProductDetailComponent},
      {path: 'report', children: [
        {path: 'list', component: ProductReportListComponent},
        {path: 'detail/:productId', component: ProductReportDetailComponent},
      ]}
    ]},
    {path: 'master', children: [
      {path: 'category', children: [
        {path: 'list', component: CategoryListComponent},
        {path: 'add', component: CategoryAddComponent},
        {path: 'edit/:categoryId', component: CategoryEditComponent},
      ]},
      {path: 'brand', children: [
        {path: 'list', component: BrandListComponent},
        {path: 'add', component: BrandAddComponent},
        {path: 'edit/:brandId', component: BrandEditComponent},
      ]}
    ]},
    {path: 'package', children: [
      {path: 'list', component: PackageListComponent},
      {path: 'add', component: PackageAddComponent},
      {path: 'edit/:packageId', component: PackageEditComponent},
    ]},
    {path: 'support-executive', children: [
      {path: 'list', component: SupportListComponent},
      {path: 'add', component: SupportAddComponent}
    ]},
    {path: 'notification', children: [
      {path: 'send-notification', component: SendNotificationComponent},
      {path: 'send-email', component: SendEmailComponent},
      {path: 'send-sms', component: SendSmsComponent},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
