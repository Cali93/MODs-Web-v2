import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeEditorRoutingModule } from './three-editor-routing.module';
import { ThreeEditorComponent } from './three-editor/three-editor.component';
import { LibComponent } from './lib/lib.component';
import { ThreeEditorService } from '@app/three-editor/three-editor.service';

@NgModule({
  imports: [
    CommonModule,
    ThreeEditorRoutingModule
  ],
  declarations: [ThreeEditorComponent, LibComponent],
  exports: [ThreeEditorComponent, LibComponent],
  providers: [ ThreeEditorService ]
})
export class ThreeEditorModule { }
