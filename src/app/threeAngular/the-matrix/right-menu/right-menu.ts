import { Component } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: 'right-menu.html',
  styleUrls: ['./right-menu.scss']
})
export class RightMenuComponent {

  isActive = true;

  constructor() {}

  activeButton() {
    this.isActive = !this.isActive;
  }
}

