import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentMainComponent} from "./student-main/student-main.component";
import {RouterModule} from "@angular/router";
import { StudentBookComponent } from './student-book/student-book.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GenModule} from "../general/gen.module";
import {LibModule} from "../librarian/lib.module";



@NgModule({
  declarations: [StudentMainComponent, StudentBookComponent, StudentDashboardComponent],
  exports: [StudentMainComponent, StudentBookComponent, StudentDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    GenModule,
    LibModule,
  ]
})
export class StudModule { }
