import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {BorrowBook} from "../../librarian/book.interface";
import {Router} from "@angular/router";
import {StudService} from "../stud.service";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {


  thisUrl: string = this._route.url;
  strSearch: string = '';
  borrowbookKey: string = '';
  today: string = moment().format('YYYY-MM-DD');



  // Получаем инфу о книгах и студентах)
  borrowBooks: BorrowBook[] = [];
  viewBorrowBooks: BorrowBook[] = [];

  constructor(private _route: Router, private _service: StudService) {
  }

  ngOnInit(): void {

    this._service.getInfoStuds().subscribe(item => {
      this.viewBorrowBooks = item;
      this.borrowBooks = this.viewBorrowBooks.sort(item => item.returnBookCheck ? 1 : -1 );
    })


    this._service.debugHash(this.thisUrl);



    // this._service.getAllBorrowBook().subscribe(item => {
    //   this.viewBorrowBooks = item;
    //   this.borrowBooks = this.viewBorrowBooks.sort(item => item.returnBookCheck ? 1 : -1);
    // })
  }



  findBorrowBook(str: string) {
    this.borrowBooks = this.borrowBooks.filter(item =>
      item.student.studName.toUpperCase().includes(str.toUpperCase()) ||
      item.student.studLastName.toUpperCase().includes(str.toUpperCase()) ||
      item.book.bookName.toUpperCase().includes(str.toUpperCase()) ||
      item.book.bookAuthor.toUpperCase().includes(str.toUpperCase())
    )

    if (this.borrowBooks.length === 0 || str.length === 0) {
      this.borrowBooks = this.viewBorrowBooks;
    }
  }






}
