import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {authStudent} from "../autorisation/student.interface";
import {Book, BorrowBook, Comment} from "../librarian/book.interface";

@Injectable({
  providedIn: 'root'
})
export class StudService {

  constructor(private db: AngularFireDatabase) {
  }

  studID: string = JSON.parse(localStorage.getItem('authUser') as string)[0].key;

  debugHash(thisUrl: string) {
    if (thisUrl.split('#').length > 1) {
      window.location.href = thisUrl.split('#')[0]
    }
  }

  getInfoStuds() {
    return this.db.list('/borrowbook', ref => ref.orderByChild('student/studKey')
      .equalTo(this.studID))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as BorrowBook }))
        )
      );
  }



  getAllComments() {
    return this.db.list('/comment')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Comment }))
        )
      );
  }

  addComment(data: object) {
    this.db.list('/comment').push(data);
  }

  deleteComment(key: string) {
    this.db.list('/comment').remove(key);
  }

  updateComment(key: string, data: object) {
    this.db.list('/comment').update(key, data);
  }


  getAllBooks() {
    return this.db.list('/book')
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Book }))
        )
      );
  }


}
