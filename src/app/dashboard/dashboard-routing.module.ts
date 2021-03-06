import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {AdminComponent} from "../admin/admin.component";
import {ScriptsComponent} from "../scripts/scripts.component";
import {DashboardhomeComponent} from "../dashboardhome/dashboardhome.component";
import {DashboardListComponent} from "../dashboard-list/dashboard-list.component";
import {AdminGuard} from "../admin/admin-guard.service";
import {AuthService} from "../auth.service";

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardListComponent,
        children: [
          {
            path: 'admin',
            component: AdminComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'scripts',
            component: ScriptsComponent
          },
          {
            path: '',
            component: DashboardhomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class DashboardRoutingModule { }
