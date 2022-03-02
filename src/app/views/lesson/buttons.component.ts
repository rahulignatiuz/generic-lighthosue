import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import { ActivatedRoute, Router } from  '@angular/router';
import {Constant} from '../../_global/constant';

import { FormBuilder, FormGroup, Validators, NgForm } from  '@angular/forms';


@Component({
  templateUrl: 'buttons.component.html',
  styleUrls: ['./buttons.component.scss']

})
export class ButtonsComponent implements OnInit {
  results:any[];
  public _baseURL : string;
  URLlessonID: number;
  issuedescription:string;
  rootcouse:string;
  Recommendation:string;
  impactcategory:string;
  impactlevel:string;
  milestones :string;
  phase:string;
  projectNumber:string;
  _projectPhase:string;
  _projectname:string;
  _projectType:string;
  title:string;
  created_date:string;
  created_by:string;
  lessontype:string;


  constructor(private router: Router,private userService:UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    this._baseURL = Constant.baseURL;
    this.getUserLessons();
  }
  
  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      //console.log('routeParams 1', routeParams);
      console.log('lessonid', routeParams.id);
      if (routeParams && routeParams.id) {
        let rid = routeParams.id;
        this.URLlessonID = rid;
        if(this.URLlessonID) this.getlessonbyid(this.URLlessonID);
      }
    });
  }
  
  getUserLessons() {	  
    this.userService.getUserLessons().subscribe((data) => {                     
          this.results = data.result;          
    });  
  }
  getlessonbyid(ID) {
    this.userService.getlessonbyProjectID(ID).subscribe((data) => {        
    console.log(data.result[0]);
    this.title = data.result[0].Title;
    this._projectType = data.result[0].projecttype;
    this._projectname = data.result[0].projectname;
    this.projectNumber = data.result[0].LPN;
    this._projectPhase = data.result[0].phase;
    this.issuedescription = data.result[0].IssueDescription;
    this.rootcouse = data.result[0].RootCause;
    this.Recommendation = data.result[0].Recommendation;
    this.impactcategory = data.result[0].impactcategory;
    this.milestones = data.result[0].milestones;
    this.phase = data.result[0].phase;
    this.impactlevel = data.result[0].impactlevel;
    this.created_date = data.result[0].UpdatedDate;
    this.created_by = data.result[0].Email;
    this.lessontype = data.result[0].lessontypeName;
      });
  }

}
