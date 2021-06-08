import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../autorisation/auth.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class LibrGuard implements CanActivate {

  constructor(private _route: Router,) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

    if (localStorage.getItem('authUser') === null) {
      this._route.navigate(['/'])
      return false
    }

    const authUser = JSON.parse(localStorage.getItem('authUser') as string);
    return (authUser[0].key !== '' && authUser[0].userFlag === 'librarian');

  }
}
