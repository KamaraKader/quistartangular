import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoadingPComponent} from './loading-p.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NzSelectModule,
        NzModalModule,
        NzSpinModule,
    ],
  declarations: [LoadingPComponent],
  exports: [LoadingPComponent]
})
export class LoadingPModule { }
