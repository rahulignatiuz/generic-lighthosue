import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLessonsComponent } from './view-lessons.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ViewLessonsRoutingModule } from './view-lessons-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    ViewLessonsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ViewLessonsRoutingModule,
    Ng2SearchPipeModule,
    TagInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ViewLessonsModule { }
