import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutorisationComponent} from "./auth/autorisation.component";
import {ReactiveFormsModule} from "@angular/forms";





@NgModule({
  declarations: [
    AutorisationComponent
  ],
  exports: [
    AutorisationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
