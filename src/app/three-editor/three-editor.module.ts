import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeEditorRoutingModule } from './three-editor-routing.module';
import { ThreeEditorComponent } from './three-editor/three-editor.component';
<<<<<<< HEAD
=======
import { LibComponent } from './lib/lib.component';
>>>>>>> 5613fec6080cfd185374103198a125b1b9e45844
import { ThreeEditorService } from '@app/three-editor/three-editor.service';

@NgModule({
  imports: [
    CommonModule,
    ThreeEditorRoutingModule
  ],
<<<<<<< HEAD
  declarations: [ThreeEditorComponent],
  exports: [ThreeEditorComponent],
=======
  declarations: [ThreeEditorComponent, LibComponent],
  exports: [ThreeEditorComponent, LibComponent],
>>>>>>> 5613fec6080cfd185374103198a125b1b9e45844
  providers: [ ThreeEditorService ]
})
export class ThreeEditorModule { }
