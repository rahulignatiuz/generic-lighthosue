import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { TagInputModule } from 'ngx-chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserdashboardComponent } from './userdashboard.component';
import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccumulationChartModule,PyramidSeriesService,AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService} from '@syncfusion/ej2-angular-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { MylessonsProjectComponent } from './mylesson-project/mylesson-project.component';
import { DataTablesModule } from 'angular-datatables';
import { AddLessonComponent } from './add-project/add-project.component';
import { AddProcessComponent } from './add-process/add-process.component';
import { UpdateProcessComponent } from './update-process/update-process.component';
import { MylessonProcessComponent } from './mylesson-process/mylesson-process.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { BulkImportComponent } from './bulk-import/bulk-import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule,
    UserdashboardRoutingModule,
    TabsModule,
    TagInputModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
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
  declarations: [UserdashboardComponent, UpdateProjectComponent, MylessonsProjectComponent, AddLessonComponent, AddProcessComponent, UpdateProcessComponent, MylessonProcessComponent, BulkImportComponent],
  providers: [PyramidSeriesService, AccumulationDataLabelService,AccumulationTooltipService,AccumulationLegendService]
})
export class UserdashboardModule { }
