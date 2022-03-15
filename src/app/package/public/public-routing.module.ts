import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import {LoginComponent} from "./pages/login/login.component";
import {SessionExpireComponent} from "./pages/session-expire/session-expire.component";



const routes: Routes = [
  {path: '',
    component: PublicComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'expire', component: SessionExpireComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
