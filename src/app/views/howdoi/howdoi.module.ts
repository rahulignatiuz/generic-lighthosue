import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowdoiComponent } from './howdoi.component';
import { HowdoiRoutingModule } from './howdoi-routing.module';


@NgModule({
  declarations: [
    HowdoiComponent
  ],
  imports: [
    CommonModule,
    HowdoiRoutingModule
  ]
})
export class HowdoiModule { }
