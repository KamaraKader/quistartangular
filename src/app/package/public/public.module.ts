import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import {

} from 'ng-zorro-antd';
import {SessionExpireComponent} from "./pages/session-expire/session-expire.component";
import {LoginComponent} from "./pages/login/login.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCardModule} from "ng-zorro-antd/card";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconsProviderModule} from "../../icons-provider.module";


@NgModule({
  declarations: [PublicComponent, SessionExpireComponent,LoginComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    IconsProviderModule
  ]
})
// @ts-ignore
export class PublicModule { }
