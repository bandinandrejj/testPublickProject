import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthModule} from "./autorisation/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {StudentMainComponent} from './student/student-main/student-main.component';
import {FormsModule} from "@angular/forms";
import {LibModule} from "./librarian/lib.module";
import {AppRoutingModule} from "./app-routing.module";
import {StudModule} from "./student/stud.module";
import {GenModule} from "./general/gen.module";





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LibModule,
    StudModule,
    BrowserModule,
    AuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    GenModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
