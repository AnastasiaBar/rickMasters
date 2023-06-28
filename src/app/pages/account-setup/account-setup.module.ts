import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSetupComponent } from './account-setup.component';
import {RouterModule, Routes} from '@angular/router';
import {TitlePageModule} from "../../components/sub-components/title-page/title-page.module";
import {SidebarModule} from "../../components/sub-components/sidebar/sidebar.module";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


const routes: Routes = [
  {
    path: '',
    component: AccountSetupComponent
  }
];

@NgModule({
  declarations: [
    AccountSetupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TitlePageModule,
    SidebarModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
  ]
})
export class AccountSetupModule { }
