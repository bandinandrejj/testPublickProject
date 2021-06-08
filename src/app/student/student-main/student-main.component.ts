import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {authStudent} from "../../autorisation/student.interface";
import {menuList} from "./stud-menulist";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit, AfterViewChecked {

  userInfo: authStudent = JSON.parse(localStorage.getItem('authUser') as string)[0];

  items:menuList[] = [];
  hovering: boolean = false;
  item: string = '';
  title: string = '';

  constructor(private route: Router, private router: ActivatedRoute,  private cdRef: ChangeDetectorRef   ) {
  }

  ngOnInit(): void {
    this.items = menuList;
  }

  ngAfterViewChecked() {
    this.items = menuList;
    this.cdRef.detectChanges();
  }

  logout(flag: boolean = false) {

    if (flag) {
      localStorage.clear();
      this.route.navigate(['/home'])
    }

  }

  // selSrc(item: string): string {
  //   console.log(this.hovering)
  //   console.log(item)
  //
  //   if (this.hovering) {
  //     return `assets/icon/${item}_actual.svg`;
  //   } else {
  //     return `assets/icon/${item}.svg`;
  //   }
  //
  // }
  // test() {
  //   console.log(this.route.url)
  // }

  dynamicImg(img: string, route: string): string {
    if (this.route.url === `/student/${route}`) {
      return `${img}_actual`;
    }
    return img
  }

  btnNavigate(route: string) {
    return this.route.navigate([`./${route}`], {relativeTo: this.router})
  }


  dynamicSelec(route: string, title: string): boolean {
    if (this.route.url === `/student/${route}`) {
      this.title = title;
      return true
    } else {
      return false
    }
  }

}
