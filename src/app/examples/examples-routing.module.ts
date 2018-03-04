import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { ParentComponent } from './theming/parent/parent.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ProjectsComponent } from '@app/examples/projects/projects.component';
import { PreordersComponent } from '@app/examples/preorders/preorders.component';
import { OrdersComponent } from '@app/examples/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Projects'
        }
      },
      {
        path: 'preorders',
        component: PreordersComponent,
        data: {
          title: 'Pre-Orders'
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'authenticated',
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Authenticated'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
