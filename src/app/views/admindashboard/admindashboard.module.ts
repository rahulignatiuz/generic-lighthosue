import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TagInputModule } from 'ngx-chips';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import {AdmindashboardComponent} from './admindashboard.component';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
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
    AdmindashboardRoutingModule,
    TabsModule,
    TagInputModule,
    ModalModule.forRoot(),
    AccumulationChartModule,
    // NgCircleProgressModule.forRoot({
    //   "radius": 105,
    //   "space": -10,
    //   "outerStrokeGradient": true,
    //   "outerStrokeWidth": 25,
    //   "unitsFontSize": "18",
    //   "outerStrokeColor": "#4882c2",
    //   "outerStrokeGradientStopColor": "#53a9ff",
    //   "innerStrokeColor": "#ffffff",
    //   "innerStrokeWidth": 5,
    //   // "title": "UI",
    //   "animateTitle": false,
    //   "animationDuration": 1500,
    //   "showUnits": false,
    //   "showBackground": false,
    //   "startFromZero": false,
      
    //   "lazy": true})
    // NgCircleProgressModule.forRoot({
    //   "backgroundOpacity": 0.1,
    //   "backgroundPadding": -22,
    //   "radius": 129,
    //   "space": -20,
    //   "toFixed": 1,
    //   "unitsFontSize": "24",
    //   "innerStrokeColor": "#78797d",
    //   "unitsFontWeight": "300",
    //   "outerStrokeWidth": 10,
    //   // "innerStrokeColor": "#ffffff",
    //   "innerStrokeWidth": 10,
    //   "titleFontSize": "24",
    //   "titleFontWeight": "300",
    //   "subtitleFontSize": "34",
    //   "subtitleFontWeight": "200",
    //   // "imageHeight": "20",
    //   // "imageWidth": "20",
    //   "animationDuration": 1200,
    //   "showSubtitle": false,
    //   "outerStrokeLinecap": "butt",
    //   "showBackground": false})
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
      "subtitleColor": "#2e2e2e",
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
  declarations: [AdmindashboardComponent, LessonsComponent,] ,
  providers: [PyramidSeriesService, AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService]
    
})
export class AdmindashboardModule { }
