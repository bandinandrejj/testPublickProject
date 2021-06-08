import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibService} from "../lib.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Book, Comment} from "../book.interface";

@Component({
  selector: 'app-librarian-book',
  templateUrl: './librarian-book.component.html',
  styleUrls: ['./librarian-book.component.css']
})
export class LibrarianBookComponent implements OnInit {

  str: string = '';
  thisUrl: string = this._route.url;

  // ----- Книга ----

  viewBooks: Book[] = [];
  books: Book[] = [];
  private keyBook: string = '';
  bookName: string = '';
  booAuthor: string = '';

  // ----- Комментарий ----

  viewComments: Comment[] = [];
  comments: Comment[] = [];
  keyBookInCom: string = '';
  keyCom: string = '';
  bookComName: string = '';
  bookComAuthor: string = '';
  addEditSwitch: boolean = true;


  userKey: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;
  userName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userName;
  userLastName: string = JSON.parse(localStorage.getItem('authUser') as string)[0].userLastName;


  constructor(private _route: Router, private _service: LibService) {}

  ngOnInit(): void {
    this._service.debugHash(this.thisUrl);

    this._service.getAllBooks().subscribe(item => {
      this.viewBooks = item;
      this.books = this.viewBooks;
    })

    this._service.getAllComments().subscribe(item => {
      this.viewComments = item;
      this.comments = this.viewComments;
    })


  }

  bookForm: FormGroup = new FormGroup({
    "bookName": new FormControl("", this.checkEmptinessInputValid),
    "bookAuthor": new FormControl("", this.checkEmptinessInputValid),
    "bookGenre": new FormControl("", [Validators.required]),
    "bookCount": new FormControl("", [Validators.required]),
    "bookInStock": new FormControl(""),
  }, {validators: this.checkBooksValidator.bind(this)})

  bookCommentForm: FormGroup = new FormGroup({
    "userKey": new FormControl(this.userKey, Validators.required),
    "userName": new FormControl(this.userName, Validators.required),
    "userLastName": new FormControl(this.userLastName, Validators.required),
    "userComment": new FormControl("", [Validators.required, this.checkEmptinessInputValid]),
    "bookKey": new FormControl(""),
  })


  findBook(str: string) {
    this.books = this.books.filter(item =>
      item.bookName.toUpperCase().includes(str.toUpperCase()) ||
      item.bookAuthor.toUpperCase().includes(str.toUpperCase()) ||
      item.bookGenre.toUpperCase().includes(str.toUpperCase())
    )
    if (this.books.length === 0 || str.length === 0) {
      this.books = this.viewBooks;
    }
  }

  clickHref(href: string = '#') {
    return window.location.href = this.thisUrl + `${href}`
  }


  // ----Валидация----

  checkEmptinessInputValid(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return {test: true}
    } else {
      return null
    }
  }

  checkBooksValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const books = this.books.map(item => `${item.bookAuthor}${item.bookName}`.split(' ').join(''));
    let book = `${control.value.bookAuthor}${control.value.bookName}`;
    book = book.split('\t').join('').split(' ').join('')

    if (books.includes(book)) {
      return {thisBookAlreadyList: true}
    } else {
      return null
    }
  }


  // ----Работа с формой книг----

  addBook() {
    this.bookForm.reset({
      bookComment: 'BETA',
      bookCount: '1'
    });
  }

  submitBookAdd() {
    this.bookForm.patchValue({
      bookName: this.bookForm.value['bookName'].trim(),
      bookAuthor: this.bookForm.value['bookAuthor'].trim(),
      bookInStock: this.bookForm.value['bookCount']
    })

    this._service.addBook(this.bookForm.value)
  }



  univBook(book: Book) {
    // console.log(book)

    this.keyBook = book.key as string;
    this.bookName = book.bookName;
    this.booAuthor = book.bookAuthor;

    this.bookForm.patchValue({
      bookName: '',
      bookAuthor: '',
      bookGenre: book.bookGenre,
      bookCount: book.bookCount,
      bookInStock: book.bookInStock,
    })
  }

  submitBookEdit() {
    this.bookForm.patchValue({
      bookName: this.bookName,
      bookAuthor: this.booAuthor,
    })
    this._service.updateBook(this.keyBook, this.bookForm.value);
  }

  submitBookDel() {
    this._service.deleteBook(this.keyBook)
  }


  // ----Работа с формой комментариев----

  dataComment(book: Book) {

    this.bookComName = book.bookName;
    this.bookComAuthor = book.bookAuthor;
    this.keyBookInCom = book.key as string; // Проверка ключа книги приходящего и ключа открывающего

    this.bookCommentForm.patchValue({
      userComment: '', // Обнуляем строку при открытие PopUp.
      bookKey: book.key // Указываем ключ книги, которую открыли.
    })

    this.addEditSwitch = true; // Явно указываем, что сначала идет добавление

  }

  submitComentAdd() {
    this._service.addComment(this.bookCommentForm.value)
    this.clearCooment()
  }

  buttonDelete(comment: Comment) {
    this._service.deleteComment(comment.key as string)
  }

  commentEdit(comment: Comment) {
    this.addEditSwitch = false; // Переключаем  PopUp на редактирование.

    this.keyBookInCom = comment.bookKey as string; // Ключ книги в объект коммент
    this.keyCom = comment.key as string; // Ключ коммент в объект коммент

    this.bookCommentForm.patchValue({
      userComment: comment.userComment
    })

  }

  submitComentEdit() {
    this._service.updateComment(this.keyCom, this.bookCommentForm.value)
    this.clearCooment()
    this.addEditSwitch = !this.addEditSwitch;

  }

  clearCooment() {
    this.bookCommentForm.patchValue({
      userComment: '',
    })
  }


}
