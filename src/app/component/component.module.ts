import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardModule, ComboModule, DialogueModule,
  DialoguePrivateModule, EnteteModule, LoadingPModule,
} from './';

@NgModule({
  imports: [
    CommonModule,
    CardModule, ComboModule, LoadingPModule, DialoguePrivateModule,
    DialogueModule, EnteteModule
  ],
  exports: [ CardModule, ComboModule, LoadingPModule, DialoguePrivateModule,
  DialogueModule, EnteteModule],
  declarations: []
})
export class ComponentModule {}
