import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {authStudent} from "../../autorisation/student.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {menuList} from "./lib-menulist";

@Component({
  selector: 'app-librarian-main',
  templateUrl: './librarian-main.component.html',
  styleUrls: ['./librarian-main.component.css']
})
export class LibrarianMainComponent implements OnInit, AfterViewChecked {

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
    if (this.route.url === `/librarian/${route}`) {
      return `${img}_actual`;
    }
    return img
  }

  btnNavigate(route: string) {
    return this.route.navigate([`./${route}`], {relativeTo: this.router})
  }


  dynamicSelec(route: string, title: string): boolean {
    if (this.route.url === `/librarian/${route}`) {
      this.title = title;
      return true
    } else {
      return false
    }
  }


}
