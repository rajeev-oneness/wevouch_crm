import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";
import { CustomerListComponent } from "./component/admin/customer/customer-list/customer-list.component";
import { CustomerAddComponent } from "./component/admin/customer/customer-add/customer-add.component";
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
import { BrandListComponent } from "./component/admin/master/brand/brand-list/brand-list.component";
import { BrandAddComponent } from "./component/admin/master/brand/brand-add/brand-add.component";
const routes: Routes = [
  {path : '', component : DashboardComponent, pathMatch:'full'},
  {path: 'admin', children: [
    {path : 'dashboard', component : DashboardComponent},
    {path : 'customer', children: [
      {path: 'list', component: CustomerListComponent},
      {path: 'add', component: CustomerAddComponent},
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
        {path: 'add', component: CategoryAddComponent}
      ]},
      {path: 'brand', children: [
        {path: 'list', component: BrandListComponent},
        {path: 'add', component: BrandAddComponent}
      ]}
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
