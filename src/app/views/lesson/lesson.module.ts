import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { lessonComponent } from './lesson.component';
//import { BrandButtonsComponent } from './brand-buttons.component';

// Dropdowns Component
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { DropdownsComponent } from './dropdowns.component';

// Buttons Routing
import { LessonRoutingModule } from './lesson-routing.module';
import { LessonProcessComponent } from './lesson-process/lesson-process.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    LessonRoutingModule,
    //BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    lessonComponent,
    LessonProcessComponent
   // DropdownsComponent,
   // BrandButtonsComponent
  ]
})
export class lessonModule { }
