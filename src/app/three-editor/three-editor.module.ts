import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeEditorRoutingModule } from './three-editor-routing.module';
import { ThreeEditorComponent } from './three-editor/three-editor.component';
import { LibComponent } from './lib/lib.component';

@NgModule({
  imports: [
    CommonModule,
    ThreeEditorRoutingModule
  ],
  declarations: [ThreeEditorComponent, LibComponent]
})
export class ThreeEditorModule { }
