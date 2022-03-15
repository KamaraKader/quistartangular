import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialoguePrivateComponent} from './dialogue-private.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DialoguePrivateComponent],
  exports: [DialoguePrivateComponent]
})
export class DialoguePrivateModule { }
