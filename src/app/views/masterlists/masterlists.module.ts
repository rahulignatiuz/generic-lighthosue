import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterlistsComponent } from './masterlists.component';
import  { MasterlistsRoutingModule } from './masterlists-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';

// import { NgbdTooltipBasic } from './tooltip-basic';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    MasterlistsComponent
  ],
  imports: [
    CommonModule,
    MasterlistsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatTabsModule,
    DragDropModule,
    ModalModule

  ]
})
export class MasterlistsModule { }
