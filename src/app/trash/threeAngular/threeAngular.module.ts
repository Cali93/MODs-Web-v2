import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  TheMatrixComponent
} from './the-matrix/the-matrix';
import {
  TheToolbarComponent
} from './the-matrix/the-toolbar/the-toolbar';
import {
  LeftMenuComponent
} from './the-matrix/left-menu/left-menu';
import {
  RightMenuComponent
} from './the-matrix/right-menu/right-menu';

import {
  TheArchitect
} from './the-matrix/the-architect.service';

@NgModule({
  declarations: [
    TheMatrixComponent, TheToolbarComponent, LeftMenuComponent, RightMenuComponent
  ],
  providers: [
    TheArchitect
  ],
  imports: [],
  exports: [
    TheMatrixComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ThreeAngular {}
