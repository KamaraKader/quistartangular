import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogueComponent} from './dialogue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DialogueComponent],
  exports: [DialogueComponent]
})
export class DialogueModule { }
