import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import {PmdashboardComponent} from './pmdashboard.component';

import { PmdashboardRoutingModule } from './pmdashboard-routing.module';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TagInputModule } from 'ngx-chips';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { LessonsComponent } from './lessons/lessons.component';
import { AccumulationChartModule,PyramidSeriesService,AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService} from '@syncfusion/ej2-angular-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule,
    PmdashboardRoutingModule,
    TabsModule,
    TagInputModule,
    ModalModule.forRoot(),
    AccumulationChartModule,
    
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
    
  ],
  declarations: [PmdashboardComponent, LessonsComponent],
  providers: [PyramidSeriesService, AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService]
})
export class PmdashboardModule { }
