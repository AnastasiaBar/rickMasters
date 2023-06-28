import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from "./sidebar.component";
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule
  ]
})
export class SidebarModule { }
