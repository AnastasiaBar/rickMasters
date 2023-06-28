import { Component } from '@angular/core';
import {ComponentInteractionService} from "../../../core/services/componentInteraction.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  panelOpenState = false;

  constructor(private componentInteraction: ComponentInteractionService) {

  }

  ngOnInit(){

    this.componentInteraction.state$.subscribe((data: any) =>{
      this.panelOpenState = data
    })
  }
}
