import { Component } from '@angular/core';
import {ComponentInteractionService} from "../../../core/services/componentInteraction.service";

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent {

  stateSidebar = false;


  constructor(private componentInteraction: ComponentInteractionService) {
  }

  stateBurger(){
    this.stateSidebar = !this.stateSidebar
    this.componentInteraction.stateSidebar(this.stateSidebar)
  }
}
