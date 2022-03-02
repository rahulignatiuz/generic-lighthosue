import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TagInputModule } from 'ngx-chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccumulationChartModule,PyramidSeriesService,AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService} from '@syncfusion/ej2-angular-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateLessonProjectComponent } from './update-lesson-project.component';
import { UpdateLessonProjectRoutingModule } from './update-lesson-project-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [UpdateLessonProjectComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UpdateLessonProjectRoutingModule,
    MatTabsModule,
    ChartsModule,
    Ng2SearchPipeModule,
    BsDropdownModule,
    ButtonsModule,
    TagInputModule,
    NgxPaginationModule,
    AccumulationChartModule,
    TabsModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
    DragDropModule,
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundOpacity": 0.6,
      "backgroundStrokeWidth": 38,
      "backgroundPadding": 6,
      "radius": 100,
      "space": -20,
      "unitsFontSize": "24",
      "unitsColor": "#353131",
      "outerStrokeGradient": true,
      "outerStrokeWidth": 21,
      "outerStrokeColor": "#51e53e",
      "outerStrokeGradientStopColor": "#55e641",
      "outerStrokeLinecap": "butt",
      "innerStrokeColor": "#78797d",
      // "innerStrokeColor": "#c9cacf",
      "innerStrokeWidth": 19,
       "subtitle": "",
      "titleFontSize": "40",
      "subtitleColor": "#151414",
      // "subtitleFontSize": "20",
      // "titleFontSize": "20",
      "animateTitle": false,
      "animationDuration": 1000,
      "showTitle": true,
      "showSubtitle": true,
      "showUnits": true,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "lazy": false})
  ]
})
export class UpdateLessonProjectModule { }
