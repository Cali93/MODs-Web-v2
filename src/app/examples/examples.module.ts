import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { todosReducer } from './todos/todos.reducer';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ProjectsComponent } from './projects/projects.component';
import { PreordersComponent } from './preorders/preorders.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderedComponent } from './ordered/ordered.component';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature('examples', {
      todos: todosReducer,
      stocks: stockMarketReducer
    }),
    EffectsModule.forFeature([TodosEffects, StockMarketEffects])
  ],
  declarations: [
    ExamplesComponent,
    TodosComponent,
    StockMarketComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    ProjectsComponent,
    PreordersComponent,
    OrdersComponent,
    OrderedComponent
  ],
  providers: [StockMarketService]
})
export class ExamplesModule {
  constructor() {}
}
