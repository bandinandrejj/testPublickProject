import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {authStudent} from "../student.interface";
import {Router} from "@angular/router";


@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.css']
})
export class AutorisationComponent implements OnInit {

  constructor(private _service: AuthService, private router: Router) {

  }

  authUser: any;
  userPassInvalid: boolean = false;
  userAuthInvalid: boolean = false;

  ngOnInit(): void {
  }

  authForm: FormGroup = new FormGroup({
    "userLogin": new FormControl("", [Validators.required, Validators.pattern('^(stud[0-9]{4})$|^(libr[0-9]{4})$')]),
    "userPass": new FormControl("", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{6,30}$')]),
  });


  submitAuth() {
    // this._service.getAuth(this.authForm.value.userLogin, this.authForm.value.userPass);




    this._service.getAuth(this.authForm.value.userLogin)
      .subscribe((item: authStudent[]) => {
          if (item.length === 0 || item.length > 1) {
            this.userAuthInvalid = true;
            this.userPassInvalid = false;
            this.authForm.reset();
          } else {
            if (item[0].userPass !== this.authForm.value.userPass) {
              this.userAuthInvalid = false;
              this.userPassInvalid = true;
              this.authForm.controls['userPass'].reset();
            } else {
              localStorage.setItem('authUser', JSON.stringify(item));
              item[0].userFlag === 'student' ? this.router.navigate(['/student']) : this.router.navigate(['/librarian'])
            }
          }
        }
      )
  }




}
