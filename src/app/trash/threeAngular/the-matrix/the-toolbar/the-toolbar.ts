import { Component, OnInit } from '@angular/core';
import { TheArchitect } from '../the-architect.service';

@Component({
  selector: 'app-the-toolbar',
  templateUrl: 'the-toolbar.html',
  styleUrls: ['./the-toolbar.scss']
})

export class TheToolbarComponent implements OnInit {
  isActive: boolean;
  tooltip: string;


  constructor(
    public theArchitect: TheArchitect
  ) {
  }

  ngOnInit(){
    this.isActive = false;
    this.tooltip = '';
  }

  callDeleteMod(){
    this.theArchitect.removeSelection();
  }
  callAddMod(){
    this.theArchitect.addMod();
  }
  callChangeEditMode(){
    this.theArchitect.changeEditMode();
  }
  callCloneObject(){
    this.theArchitect.cloneSelection();
  }
  setTooltip(tip){
    this.tooltip = tip;
    this.isActive = true;
  }
  callSelectAll(){
    this.theArchitect.selectAll();
  }


}
