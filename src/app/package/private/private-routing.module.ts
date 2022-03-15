import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateComponent} from "./private.component";
import {DefaultDashboardComponent} from "./pages/dash/default-dashboard.component";




const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    data: {
      title: ' ',
      headerDisplay: true
    },
    children: [
      { path: '', component: DefaultDashboardComponent, pathMatch: 'full'},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
