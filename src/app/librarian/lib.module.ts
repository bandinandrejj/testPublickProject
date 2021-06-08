import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibrarianMainComponent} from "./librarian-main/librarian-main.component";
import {HeadingTouchDirective} from "../general/heading-touch.directive";
import {LibrarianStudComponent} from "./librarian-stud/librarian-stud.component";
import {LibrarianBookComponent} from "./librarian-book/librarian-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TableTouchDirective} from '../general/table-touch.directive';
import {LibrarianBorrowbookComponent} from './librarian-borrowbook/librarian-borrowbook.component';
import {LibrarianDashboardComponent} from './librarian-dashboard/librarian-dashboard.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgxMaskModule, IConfig} from 'ngx-mask'
import {GenModule} from "../general/gen.module";


@NgModule({
  declarations: [
    LibrarianMainComponent,
    LibrarianBookComponent,
    TableTouchDirective,
    LibrarianBorrowbookComponent,
    LibrarianDashboardComponent,
  ],
  exports: [
    LibrarianMainComponent,
    LibrarianBookComponent,
    TableTouchDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgxMaskModule.forRoot(),
    GenModule,
  ]
})
export class LibModule {
}
