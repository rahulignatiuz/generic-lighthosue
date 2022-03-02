import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P404Component } from './404.component';
import  { P404RoutingModule } from './404-routing.module';


@NgModule({
  declarations: [
    P404Component
  ],
  imports: [
    CommonModule,
    P404RoutingModule
  ]
})
export class P404Module { }