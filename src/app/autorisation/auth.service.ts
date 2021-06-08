import {Injectable} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {authStudent} from "./student.interface";
import {Observable, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFireDatabase) {
  }

  // getAuth(login: string, password: string): any {
  //   this.db.list('/students', ref => ref.orderByChild('userLogin')
  //     .equalTo(login))
  //     .snapshotChanges()
  //     .pipe(
  //       map(changes =>
  //         changes.map(c => ({key: c.payload.key, ...c.payload.val() as authStudent}))
  //       )
  //     )
  //    .subscribe((item: authStudent[]) => {
  //       if (item.length !== 0) {
  //        item[0].userPass === password ?
  //          localStorage.setItem('authUser', JSON.stringify(item)) :
  //          localStorage.setItem('checkUserPassInvalid','true');
  //       } else {
  //        localStorage.setItem('authUser', 'false');
  //       }
  //     }
  //   )
  // }

  getAuth(login: string) {
    return this.db.list('/user', ref => ref.orderByChild('userLogin')
      .equalTo(login))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val() as authStudent}))
        )
      )
  }





}
