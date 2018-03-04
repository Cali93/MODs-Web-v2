import { Component, OnInit } from '@angular/core';

import { routerTransition } from '@app/core';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routerTransition]
})
export class ExamplesComponent implements OnInit {
  examples = [
    { link: 'projects', label: 'Projects' },
    { link: 'preorders', label: 'Pre-orders' },
    { link: 'orders', label: 'Orders' },
    { link: 'authenticated', label: 'Authenticated' }
  ];

  constructor() {}

  ngOnInit() {}
}
