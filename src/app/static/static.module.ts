import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ThreeEditorComponent} from '../three-editor/three-editor/three-editor.component';
import { LibComponent } from '@app/three-editor/lib/lib.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [AboutComponent, FeaturesComponent, ThreeEditorComponent, LibComponent]
})
export class StaticModule {}
