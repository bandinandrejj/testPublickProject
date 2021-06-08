import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../lib.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, BorrowBook} from "../book.interface";
import {authStudent} from "../../autorisation/student.interface";
import * as moment from 'moment';


@Component({
  selector: 'app-librarian-borrowbook',
  templateUrl: './librarian-borrowbook.component.html',
  styleUrls: ['./librarian-borrowbook.component.css']
})
export class LibrarianBorrowbookComponent implements OnInit {

  thisUrl: string = this._route.url;
  strSearch: string = '';
  borrowbookKey: string = '';
  today: string = moment().format('YYYY-MM-DD');

  // Получаем инфу из локалСтораге)
  libID: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  libName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName;
  libLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName;

  // Получаем инфу о книгах и студентах)
  books: Book[] = [];
  students: authStudent[] = [];
  borrowBooks: BorrowBook[] = [];
  viewBorrowBooks: BorrowBook[] = [];

  constructor(private _route: Router, private _service: LibService) {
  }

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.books = item;
    })

    this._service.getAllStuds().subscribe(item => {
      this.students = item;
    })

    this._service.getAllBorrowBook().subscribe(item => {
      this.viewBorrowBooks = item;
      this.borrowBooks = this.viewBorrowBooks.sort(item => item.returnBookCheck ? 1 : -1);
    })
  }

  borrowBookForm: FormGroup = new FormGroup({
    "librarian": new FormGroup({
      "libKey": new FormControl(""),
      "libName": new FormControl(""),
      "libLastName": new FormControl(""),
    }),
    "student": new FormGroup({
      "studKey": new FormControl("", Validators.required),
      "studName": new FormControl(""),
      "studLastName": new FormControl(""),
    }),
    "book": new FormGroup({
      "bookKey": new FormControl("", Validators.required),
      "bookName": new FormControl(""),
      "bookAuthor": new FormControl(""),
    }),
    "date": new FormGroup({
      "borrowBookDate": new FormControl("", Validators.required),
      "returnBookDate": new FormControl("", [Validators.required,
        this.checkReturnBookDateValid.bind(this)
      ]),
    }),
    "returnBookCheck": new FormControl("")
  })


  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  checkReturnBookDateValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > this.today) {
      return null
    } else {
      return {test: true}
    }
  }



  returnBookCheck(borrowBook: BorrowBook) {
    borrowBook.returnBookCheck = !borrowBook.returnBookCheck;

    const countBook: Book[] = this.books.filter(item => item.key === borrowBook.book.bookKey)

    if (borrowBook.returnBookCheck) {
      this._service.updateBook(borrowBook.book.bookKey, {bookInStock: countBook[0].bookInStock + 1})
    } else {
      this._service.updateBook(borrowBook.book.bookKey, {bookInStock: countBook[0].bookInStock - 1})
    }

    this._service.updateBorrowBook(borrowBook.key as string, borrowBook)
  }


  // ---- Работа с формой ----

  resetForm() {
    this.borrowBookForm.reset();

    this.borrowBookForm.controls['librarian'].patchValue({
      libKey: this.libID,
      libName: this.libName,
      libLastName: this.libLastName,
    })

    this.borrowBookForm.controls['date'].patchValue({
      borrowBookDate: this.today
    })


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

  addBorrowBook() {
    const student = this.students.filter(item => item.key === this.borrowBookForm.value["student"]["studKey"]);
    const book = this.books.filter(item => item.key === this.borrowBookForm.value["book"]["bookKey"]);

    this.borrowBookForm.controls['student'].patchValue({
      studName: student[0].userName,
      studLastName: student[0].userLastName,
    })

    this.borrowBookForm.controls['book'].patchValue({
      bookName: book[0].bookName,
      bookAuthor: book[0].bookAuthor,
    })

    this.borrowBookForm.patchValue({
      returnBookCheck: false,
    })

    const countBook: Book[] = this.books.filter(item => item.key === this.borrowBookForm.controls['book'].value['bookKey']);
    this._service.addBorrowBook(this.borrowBookForm.value);
    this._service.updateBook(this.borrowBookForm.controls['book'].value['bookKey'], {bookInStock: countBook[0].bookInStock - 1});

    this.clickHref()
  }

  dataBorrowBook(borrowBook: BorrowBook) {

    this.borrowbookKey = borrowBook.key as string;

    this.borrowBookForm.controls['librarian'].patchValue({
      libKey: borrowBook.librarian.libKey,
      libName: borrowBook.librarian.libName,
      libLastName: borrowBook.librarian.libLastName,
    })


    this.borrowBookForm.controls['student'].patchValue({
      studKey: borrowBook.student.studKey,
      studName: borrowBook.student.studName,
      studLastName: borrowBook.student.studLastName,
    })

    this.borrowBookForm.controls['book'].patchValue({
      bookKey: borrowBook.book.bookKey,
      bookName: borrowBook.book.bookName,
      bookAuthor: borrowBook.book.bookAuthor,
    })

    this.borrowBookForm.controls['date'].patchValue({
      borrowBookDate: borrowBook.date.borrowBookDate,
      returnBookDate: borrowBook.date.returnBookDate,
    })

    this.borrowBookForm.patchValue({
      returnBookCheck: borrowBook.returnBookCheck
    })

  }

  DeleteBorrowBook() {
    this._service.deleteBorrowBook(this.borrowbookKey);
    this.clickHref();
  }

  EditBorrowBook() {

    const book = this.books.filter(item => item.key === this.borrowBookForm.value["book"]["bookKey"]);

    this.borrowBookForm.controls['book'].patchValue({
      bookName: book[0].bookName,
      bookAuthor: book[0].bookAuthor,
    })

    this._service.updateBorrowBook(this.borrowbookKey, this.borrowBookForm.value)
    this.clickHref();
  }


}
