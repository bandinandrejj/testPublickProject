import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeadingTouchDirective} from "./heading-touch.directive";
import {LibrarianStudComponent} from "../librarian/librarian-stud/librarian-stud.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";



@NgModule({
  declarations: [
    HeadingTouchDirective,
    LibrarianStudComponent,
  ],
  exports: [
    HeadingTouchDirective,
    LibrarianStudComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class GenModule { }
