import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../../_global/constant';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-lesson-process',
  templateUrl: './lesson-process.component.html',
  styleUrls: ['./lesson-process.component.scss']
})
export class LessonProcessComponent implements OnInit {

  results: any[];
  public _baseURL: string;
  URLlessonID: number;
  issuedescription: string;
  rootcouse: string;
  Recommendation: string;
  impactcategory: string;
  impactlevel: string;
  projectNumber: string;
  _projectPhase: string;
  _projectname: string;
  process: string;
  title: string;
  created_by: string;
  lessontype: string;
  lifecycle: string;
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
  Email: string;
  showattachment: boolean = true;
  toggle = true;
  status = 'Enable';
  processName: string;
  keyName: string;
  getuserusefullesson: string;
  data: any;
  // sendit: any;
  showuseruseful: boolean = true;
  useruseful: string;
  show: boolean = true;
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
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
        if (this.URLlessonID) this.getlessonbyid(this.URLlessonID);
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
    this.userService.getlessonbyProcessID(ID).subscribe((data) => {
      console.log(data.result[0]);
      this.title = data.result[0].Title;
      this.issuedescription = data.result[0].IssueDescription;
      this.likes = data.result[0].likes;
      this.UserID = JSON.parse(localStorage.getItem('currentUser')).ID;
      this.useruseful = data.result[0].useruseful;
      this.rootcouse = data.result[0].RootCause;
      this.LessonID = data.result[0].LessonID;
      this.functions = data.result[0].functions;
      this.department = data.result[0].department;
      this.lifecycle = data.result[0].lifecycle;
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
      this.created_by = data.result[0].Email;
      this.lessontype = data.result[0].lessontypeName;
      this.processName = data.result[0].Name;
      if (data.result[0].likes != 0) {
        this.toggle = !this.toggle;
      } else {
        this.toggle = this.toggle;
      }
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
  adduserlikes(lessonid, UserID, Likes) {
    this.userService.adduserlikes(lessonid, UserID, Likes).subscribe((data) => {
      console.log(data);
      if (data.status) {
        this.getuserlikes = data.result;
      } else if (!data.status && data.result[0].ID) {
        console.log(data.result[0].ID);
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
  // adduserusefullesson(LessonID, UserID, data, title: string) {

  //   //console.log('212',title)
  //   // var x = document.getElementById("myDIV");

  //   this.userService.adduserusefullesson(LessonID, UserID, title).subscribe((data) => {
  //     this.getuserusefullesson = data.result;
  //     console.log(data);
  //   });


  //   document.getElementById("id01").style.display = "none";
  //   window.location.reload();

  // }

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

  
}


