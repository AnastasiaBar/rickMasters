import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TitlePageComponent} from "./title-page.component";


@NgModule({
  declarations: [
    TitlePageComponent,
  ],
  exports: [
    TitlePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class TitlePageModule { }
