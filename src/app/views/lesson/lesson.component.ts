import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../_global/constant';

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  templateUrl: 'lesson.component.html',
  styleUrls: ['./lesson.component.scss']

})
export class lessonComponent implements OnInit {
  results: any[];
  public _baseURL: string;
  URLlessonID: number;
  projectname: string;
  Email: string;
  issuedescription: string;
  rootcouse: string;
  Recommendation: string;
  impactcategory: string;
  impactlevel: string;
  projectNumber: string;
  _projectPhase: string;
  _projectname: string;
  _projectType: string;
  title: string;
  created_date: string;
  created_by: string;
  lessontype: string;
  milestones: string;
  phase: string;
  attUrl: string;
  showrootcouse: boolean = true;
  getuserlikes: any;
  likes: number;
  Likes: number;
  LessonID: number;
  UserID: number;
  attOriginalName: string;
  fileExtension: string;
  functions: string;
  department: string;
  lifecycle: string;
  showattachment: boolean = true;
  toggle = true;
  status = 'Enable';
  keyName: string;
  getuserusefullesson: string;
  data: any;
  showuseruseful: boolean = true;
  showuseruseful1: boolean = true;
  useruseful: string;
  show: boolean = true;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this._baseURL = Constant.baseURL;
    this.getUserLessons();
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      //console.log('routeParams 1', routeParams);
      // console.log('lessonid', routeParams.id);
      if (routeParams && routeParams.id) {
        let rid = routeParams.id;
        this.URLlessonID = rid;
        this.getlessonbyid(this.URLlessonID);
        //  this.getflag(this.URLlessonID);
      }
    });
    this.iconhide();
  }

  getUserLessons() {
    this.userService.getUserLessons().subscribe((data) => {
      this.results = data.result;
    });
  }
  getlessonbyid(ID) {
    this.userService.getlessonbyProjectID(ID).subscribe((data) => {
      console.log('111', data.result[0]);
      this.title = data.result[0].Title;
      this._projectType = data.result[0].projecttype;
      this._projectname = data.result[0].projectname;
      this.projectNumber = data.result[0].LPN;
      this._projectPhase = data.result[0].phase;
      this.issuedescription = data.result[0].IssueDescription;
      this.likes = data.result[0].likes;
      this.UserID = JSON.parse(localStorage.getItem('currentUser')).ID;
      this.useruseful = data.result[0].useruseful;
      this.rootcouse = data.result[0].RootCause;
      this.LessonID = data.result[0].LessonID;
      this.functions = data.result[0].functions;
      this.department = data.result[0].department;
      this.lifecycle = data.result[0].lifecycle;
      this.projectname = data.result[0].projectname;
      this.Email = data.result[0].Email;
      if (this.rootcouse == "undefined") {
        this.showrootcouse = false;
      }
      if (this.useruseful == null || this.useruseful == "") {

        this.showuseruseful = false;
      }

      this.Recommendation = data.result[0].Recommendation;
      this.impactcategory = data.result[0].impactcategory;
      this.impactlevel = data.result[0].impactlevel;
      this.milestones = data.result[0].milestones;
      this.phase = data.result[0].phase;
      this.created_date = data.result[0].UpdatedDate;
      this.created_by = data.result[0].Email;
      this.lessontype = data.result[0].lessontypeName;
      // if (this.useruseful == "" || this.useruseful.valueOf) {
      //   this.showuseruseful1 = false;
      // }

      this.userService.checkUserLike(ID, this.UserID).subscribe((data) => {
        console.log("121212121", data);
        if (data.status) {
          this.toggle = !this.toggle;
        } else {
          this.toggle = this.toggle;
        }
      });
    });
    this.userService.getLessonAttachment(ID).subscribe((data) => {
      if (data.status) {
        this.attUrl = data.result[0].Url;
        this.fileExtension = data.result[0].OriginalName.split('.').pop();
        this.attOriginalName = data.result[0].OriginalName.split(".").slice(0, -1).join('.');
      } else {

        this.showattachment = false;
      }

    });
    this.userService.getAllKeywordsByID(ID).subscribe((data) => {
      if (data.status) {
        this.keyName = data.result;
      }

    });
  }
  adduserusefullesson(LessonID, UserID, data, title: string) {

    this.userService.getallflags(LessonID).subscribe((data) => {
      this.results = data.result;
      let flag = data.data[0].flag;
      let flagID = data.data[0].ID;
      console.log('45544444444444444444', data.data[0].ID, data.data[0].flag);
      if (flag == 0) {
        flag = 1;
        this.userService.updateflag(flagID, flag, title).subscribe((data) => {
          this.results = data.result;
          console.log('services for flag 0', data);
        });
      }else {
        this.userService.adduserusefullesson(LessonID, UserID, title).subscribe((data) => {
          this.getuserusefullesson = data.result;
          console.log(data);
        });
      }
    });

    //console.log('212',title)
    // var x = document.getElementById("myDIV");
    document.getElementById("id01").style.display = "none";
    window.location.reload();

  }

  adduserusefullessonforNo(LessonID, UserID, data, title: string) {

    //console.log('212',title)
    // var x = document.getElementById("myDIV");
    document.getElementById("IDLESSON").style.display = "none";
    document.getElementById("IDLESSON1").style.display = "none";
    document.getElementById("IDLESSON3").style.display = "none";

    this.userService.adduserusefullessonforNo(LessonID, UserID, data, title).subscribe((data) => {
      this.getuserusefullesson = data.result;
      console.log(data);
    });


    document.getElementById("id01").style.display = "none";
  }
  adduserlikes(lessonid, UserID, Likes) {


    this.userService.adduserlikes(lessonid, UserID, Likes).subscribe((data) => {
      console.log("data***************--------", data);
      console.log("data.result***************--------", data.result);
      // console.log(data,data.result[0].ID);
      if (data.status) {
        console.log(data.result);
        this.getuserlikes = data.result;
        console.log(this.getuserlikes);
      } else if (!data.status && data.result[0].ID) {
        //console.log(data.result[0].ID);
        this.userService.deleteAlluserlikeSQL(data.result[0].ID).subscribe((data) => {
          if (data.status) {
            this.toggle = this.toggle;
          }
        });
      }
    });
  }
  enableDisableRule(job) {
    this.toggle = !this.toggle;
    this.status = this.toggle ? '' : '';
  }
  myClickFunction(e, data) {
    // console.log(e)
    var x = document.getElementById("myDIV");
    console.log("Value", data)
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  myClickFunction1(LessonID, UserID) {
    //  console.log(this.LessonID);
    // console.log(this.UserID);

  }
  sendit(data) {
    // console.log("Value",data)
    var x = document.getElementById("iditem");
    if(data.length > 0){
      x.classList.remove("removecss");
    }else{
      x.classList.add("removecss");

    }
    if (x.onclick) {
      //this.adduserusefullesson(this.LessonID,this.UserID,data);
    }

  }
  hiddenuserlesson() {
    var x = document.getElementById("IDLESSON");
    var x = document.getElementById("IDLESSON1");
    document.getElementById("IDLESSON").style.display = "none";
    document.getElementById("IDLESSON1").style.display = "none";
  }
  // edit icon hide
  iconhide() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
    console.log('curent user', id);
    // debugger;
    if (id == 3) {
      this.show = false;
    }
  }
  getflag(URLlessonID, title: string) {
    //  debugger;
    console.log('55546499444444444444444496465', URLlessonID);
    this.userService.getallflags(URLlessonID).subscribe((data) => {
      this.results = data.result;
      let flag = data.data[0].flag;
      let flagID = data.data[0].ID;
      console.log('45544444444444444444', data.data[0].ID, data.data[0].flag);
      if (flag == 0) {
        flag = 1;
        this.userService.updateflag(flagID, flag, title).subscribe((data) => {
          this.results = data.result;
          console.log('services for flag 0', data);
        });
      }
    });
  }

}