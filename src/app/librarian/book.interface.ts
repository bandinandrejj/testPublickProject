import {FormControl, Validators} from "@angular/forms";

export interface Book { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  key: string | null,
  bookName: string,
  bookAuthor: string,
  bookGenre: string,
  bookCount: number,
  bookInStock: number,
  bookComment: string,
}

export interface Comment {
  key: string | null,
  userKey: string,
  userName: string,
  userLastName: string,
  userComment: string,
  bookKey: string,
}

export interface BorrowBook {
  key: string | null,
  librarian: {
    libKey: string,
    libName: string,
    libLastName: string
  },
  student: {
    studKey: string,
    studName: string,
    studLastName: string
  },
  book: {
    bookKey: string,
    bookName: string,
    bookAuthor: string,
  }
  date: {
    borrowBookDate: string,
    returnBookDate: string,
  },
  returnBookCheck: boolean;


}

