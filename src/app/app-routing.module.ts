import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";
import { CustomerListComponent } from "./component/admin/customer/customer-list/customer-list.component";
import { CustomerAddComponent } from "./component/admin/customer/customer-add/customer-add.component";
const routes: Routes = [
  {path : '', component : DashboardComponent, pathMatch:'full'},
  {path : 'dashboard', component : DashboardComponent},
  {path : 'customer', children: [
      {path: 'list', component: CustomerListComponent},
      {path: 'add', component: CustomerAddComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
