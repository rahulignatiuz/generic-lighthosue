import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constant } from '../../../_global/constant';
import { Lesson } from '../../../_models/lesson';
import { Title } from '@angular/platform-browser';
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'app-mylesson-project',
  templateUrl: './mylesson-project.component.html',
  styleUrls: ['./mylesson-project.component.scss']
})
export class MylessonsProjectComponent implements OnInit {
  public results: any[];
  public projecttype: any[];
  public isloading = false;
  public searchname: string;
  public _baseURL: string;
  public projectsAsType: any;
  public selectedPhases: any;
  public selectedFunction: any;
  public selectedlifecycle: any;
  public selectedDepartment: any;
  public selectedImpactCategories: any;
  public selectedImpactLevels: any;
  public mappingProjectTypeAndProject: any;
  public MappingProjectTypeAndPhase: any;
  public mappingProjectAndMilestone: any;
  public lessontypeAsObjects: any;
  public categoriesAsObjects: any = [];
  public departmentAsObjects: any;
  public functionAsObjects: any;
  public impactlevelAsObjects: any;
  public likes: number = 0;
  public dropdownSettingsWithSearch: IDropdownSettings = {};
  public dropdownSettingsWithoutSearch: IDropdownSettings = {};
  public phaseDropdownList = [];
  public functionDropdownList = [];
  public lifecycleDropdownList = [];
  public departmentDropdownList = [];
  public milestoneDropdownList = [];
  public searchedKeyword: any;
  public selectedMilestone: any;
  public phaseIDList: any = "";
  public functionIDList: any = "";
  public lifecycleIDList: any = "";
  public departmenIDList: any = "";
  public milestoneIDList: any = "";
  public impectcategoryIDList: any = "";
  public impectlevelIDList: any = "";
  public lessontypeID: string = "";
  public typeid: any;
  public impectcategory: string = "";
  public Keywords: string = "";
  public milestone: string = "";
  public projectPhase: string = "";
  public _projectPhase: string = "";
  public projectName: string = "";
  public departments: string = "";
  public phaseID: string = "";
  public milestoneID: string = "";
  public noResult: boolean = false;
  public ProjecttypeID: string = "";
  public projectID: string = "";
  //pagination
  public _Keywords: any[] = [];
  public p: number = 1;
  public keywordsAsObjects: any;
  public SortBy: string;
  public sortbyBD: string;
  public keywordsIDList: any;
  public panelOpenState = false;
  public selectLessonType: number;
  public forcedState = false;
  public flag: string;
  public userusefullessonAsObjects: any;
  public implement: string;
  public implemented: string;
  public show: boolean = true;
  public hasuser = false;
  public lessonID:any;
  constructor(private router: Router, private userService: UserService, private titleService: Title) {
    this.router.routerState.root.queryParams.subscribe(params => {
      var lessonProjectID = params['lessonid'];
     // console.log("================",lessonProjectID);
      if(lessonProjectID){
        this.lessonID = lessonProjectID.replace(/,\s*$/, "");
        //console.log("========if========",this.lessonID);
        this.getLessonsByFilter();
      }else{
       // console.log("======else==========",lessonProjectID);
        this.getUserLessons();
      }
    });
    this._baseURL = Constant.baseURL;

    this.getProjecttype();
    this.getcategories();
    this.getimpactlevel();
    this.getdepartments();
    this.getfunctions();
    this.getlessontype();
    this.getKeywords();
    this.getlifecycle();
    this.getuserusefullesson();

    this.titleService.setTitle("Lighthouse | View Lessons");
  }

  ngOnInit() {
    this.dropdownSettingsWithSearch = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      itemsShowLimit: 1,
      enableCheckAll: false,
      allowSearchFilter: true
    };
    this.dropdownSettingsWithoutSearch = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      itemsShowLimit: 1,
      enableCheckAll: false
    };
    this.sortbyBD = "";
    this.selectLessonType = 1;
    this.implemented = "";
    this.masterlistproject();
    this.iconhide();
  }
  masterlistproject() {
    localStorage.removeItem("tabforprocess");
    localStorage.removeItem("tabID");
    var projectradiobuttn = "project";
    var projecttabselection = "tab1"
    localStorage.setItem("tabforprocess", projectradiobuttn);
    localStorage.setItem("tabID", projecttabselection);


  }
  onselectuserusefullesson(e) {
    let event = e.target.value;
    console.log(event);
    if (event == "flag") {
      this.flag = "1";
      console.log(this.flag);
    } else if (event == "flag1") {
      // debugger;
      this.flag = "0";
      console.log(this.flag);

    }
    this.getLessonsByFilter();
  }
  getuserusefullesson() {
    this.userService.getuserusefullesson().subscribe((data) => {

      this.userusefullessonAsObjects = data.result;
      console.log('1', this.userusefullessonAsObjects);

    });

  }
  togglelessonFlow(e) {
    let target = e.target;
    let value = target.value;
    if (value == 1) {
      this.router.navigate(['/user/mylessons-project']);
    } else if (value == 2) {
      this.router.navigate(['/user/mylessons-process']);
    }
    this.selectLessonType = 1;
  }
  onselectSoftBy(e) {
    let event = e.target.value;
    console.log(event);
    if (event == "newest") {
      this.SortBy = "DESC";
      console.log(this.SortBy);
    } else if (event == "oldest") {
      this.SortBy = "ASC";
      console.log(this.SortBy);
    } else if (event == "likes") {
      this.SortBy = "likes";
      console.log(this.SortBy);
    }
    this.getLessonsByFilter();
  }
  addIgnoreColumn(column: any) {
    this._Keywords.push(<any>column);
    console.log(column);
    if (this._Keywords.length > 0) {
      this.keywordsIDList = this._Keywords;
    } else {
      this.keywordsIDList = null;
    }
    this.getLessonsByFilter();
  }
  onKeywordsRemoved(column: any) {
    const index: number = this._Keywords.indexOf(<any>column);
    if (index !== -1) {
      this._Keywords.splice(index, 1);
    }
    if (this._Keywords.length > 0) {
      this.keywordsIDList = this._Keywords;
    } else {
      this.keywordsIDList = null;
    }
    this.getLessonsByFilter();
  }
  public onselectProjecttype(e) {
    this.projectID = "";
    this.selectedPhases = "";
    this.selectedMilestone = "";
    this.ProjecttypeID = e.target.value;
    this.getLessonsByFilter();
    this.getMappingProjectTypeAndProject();
    this.getMappingProjectTypeAndPhase();
    this.getMappingProjectAndMilestone();
  }
  public onselectProject(e) {
    this.projectID = e.target.value;
    this.getLessonsByFilter();

  }
  public onselectLessontype(e) {
    this.lessontypeID = e.target.value;
    this.getLessonsByFilter();
  }

  getUserLessons() {
    this.userService.getUserLessons().subscribe((data) => {
    //  console.log("+++++++++++++++++++getUserLessons++++++++++",data);
      if(data.status){
        this.results = data.result;
      }
     
    });
  }
  getKeywords() {
    this.userService.getKeywords().subscribe((data) => {
      if (data.status) {
        this.keywordsAsObjects = data.result;
      }
    });
  }
  onPhaseSelect(item: any) {
    if (this.selectedPhases.length > 0) {
      this.phaseIDList = this.selectedPhases;
    } else {
      this.phaseIDList = null;
    }
    this.getLessonsByFilter();
  }
  onFunctionSelect(item: any) {
    if (this.selectedFunction.length > 0) {
      this.functionIDList = this.selectedFunction;
    } else {
      this.functionIDList = null;
    }
    this.getLessonsByFilter();
  }
  onLifecycleSelect(item: any) {
    if (this.selectedlifecycle.length > 0) {
      this.lifecycleIDList = this.selectedlifecycle;
    } else {
      this.lifecycleIDList = null;
    }
    this.getLessonsByFilter();
  }
  onDepartmentSelect(item: any) {
    if (this.selectedDepartment.length > 0) {
      this.departmenIDList = this.selectedDepartment;
    } else {
      this.departmenIDList = null;
    }
    this.getLessonsByFilter();
  }
  onMilestoneSelect(item: any) {
    if (this.selectedMilestone.length > 0) {
      this.milestoneIDList = this.selectedMilestone;
    } else {
      this.milestoneIDList = null;
    }
    this.getLessonsByFilter();
  }
  onImpactCategoriesSelect(item: any) {
    if (this.selectedImpactCategories.length > 0) {
      this.impectcategoryIDList = this.selectedImpactCategories;
    } else {
      this.impectcategoryIDList = null;
    }
    this.getLessonsByFilter();

  }
  onImpactLevelSelect(e) {
    if (this.selectedImpactLevels.length > 0) {
      this.impectlevelIDList = this.selectedImpactLevels;
    } else {
      this.impectlevelIDList = null;
    }
    this.getLessonsByFilter();
  }

  getLessonsByFilter() {
    let obj: object = {
      ProjecttypeID: this.ProjecttypeID,
      ProjectID: this.projectID ? this.projectID : "",
      PhaseIDList: this.phaseIDList ? this.phaseIDList : "",
      FunctionIDList: this.functionIDList ? this.functionIDList : "",
      DepartmenIDList: this.departmenIDList ? this.departmenIDList : "",
      LifecycleIDList: this.lifecycleIDList ? this.lifecycleIDList : "",
      MilestoneIDList: this.milestoneIDList ? this.milestoneIDList : "",
      ImpectCategoryIDList: this.impectcategoryIDList ? this.impectcategoryIDList : "",
      ImpectLevelsIDList: this.impectlevelIDList ? this.impectlevelIDList : "",
      LessontypeID: this.lessontypeID ? this.lessontypeID : "",
      SortBy: this.SortBy ? this.SortBy : "DESC",
      KeywordsIDList: this.keywordsIDList ? this.keywordsIDList : "",
      flag: this.flag ? this.flag : "",
      LessonsID: this.lessonID ? this.lessonID : "",
    };

    this.userService.getAllFilterLessons(obj).subscribe((data) => {
      if (data.status) {
      //  console.log("=========data=======",data);
        this.noResult = false;
        this.results = data.result;
      } else {
        this.noResult = true;
        this.results = [];
      }
    });
  }

  resetFilter() {
    this.ProjecttypeID = "";
    this.SortBy = "";
    this.sortbyBD = "";
    this.noResult = false;
    this.searchedKeyword = "";
    this.selectedPhases = "";
    this.selectedFunction = "";
    this.selectedlifecycle = "";
    this.selectedDepartment = "";
    this.selectedImpactCategories = "";
    this.selectedImpactLevels = "";
    this.selectedMilestone = "";
    this.flag = "";
    this.implemented = "";
    this._Keywords = [];
    this.lessonID = "";
    this.userusefullessonAsObjects = "";
    this.projectsAsType = [];
    this.departmentAsObjects = [];
    this.functionAsObjects = [];
    this.impactlevelAsObjects = [];
    this.keywordsAsObjects = [];
    this.categoriesAsObjects = [];
    this.mappingProjectTypeAndProject = [];
    this.MappingProjectTypeAndPhase = [];
    this.mappingProjectAndMilestone = [];
    this.getProjecttype();
    this.getUserLessons();
    this.getdepartments();
    this.getcategories();
    this.getfunctions();
    this.getimpactlevel();
    this.getlessontype();
    this.getuserusefullesson();
    this.getlifecycle();
    this.getKeywords();
    //window.location.reload();
  }
  getidinurl(ID) {
    this.router.navigate(['/user/update-project/' + ID]);
  }
  getidinurlProccess(ID) {
    this.router.navigate(['/user/update-process/' + 178]);
  }

  getidlesson(ID) {
    this.router.navigate(['/lesson/' + ID]);
  }

  getProjecttype() {
    this.userService.getProjecttype().subscribe((data) => {
      if (data.status) {
        this.projectsAsType = data.result;
      }
    });
  }
  getMappingProjectTypeAndProject() {
    this.userService.getMappingProjectTypeAndProject(this.ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.mappingProjectTypeAndProject = data.result;

      }
    });
  }

  getMappingProjectTypeAndPhase() {

    this.userService.getMappingProjectTypeAndPhase(this.ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.phaseDropdownList = data.result
      }
    });
  }

  getMappingProjectAndMilestone() {
    this.userService.getMappingProjectAndMilestone(this.ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.milestoneDropdownList = data.result;
        //this.mappingProjectAndMilestone = data.result;
      }
    });

  }
  getlessontype() {
    this.userService.getlessontype().subscribe((data) => {
      this.lessontypeAsObjects = data.result;

    });
  }
  getcategories() {
    this.userService.getcategories().subscribe((data) => {

      this.categoriesAsObjects = data.result;

    });
  }

  getimpactlevel() {
    this.userService.getimpactlevel().subscribe((data) => {
      this.impactlevelAsObjects = data.result;

    });
  }
  getdepartments() {
    this.userService.getdepartments().subscribe((data) => {
      this.departmentDropdownList = data.result;

    });
  }
  getfunctions() {
    this.userService.getfunctions().subscribe((data) => {
      this.functionDropdownList = data.result;

    });
  }
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      this.lifecycleDropdownList = data.result;

    });
  }
  getuserlikes(ID) {
    this.userService.getuserlikes(ID).subscribe((data) => {
      this.getuserlikes = data.result;
    });
  }
  likebutton(ID) {
    this.likes++;
  }
  showandhide() {
    // console.log(e);
    // this.isshow = true;
    var filtersnav = document.getElementById("id04");
    var downbutton = document.getElementById("id005");
    var hidesortby = document.getElementById("id006");

    if (filtersnav.style.display === "none") {
      filtersnav.style.display = "block";
      hidesortby.style.display = "none";
      downbutton.classList.remove("fa-chevron-down");
      downbutton.classList.add("fa-chevron-up");
    } else {
      setTimeout(function () {
        filtersnav.style.display = "none";
        hidesortby.style.display = "block";
      }, 30);
      downbutton.classList.remove("fa-chevron-up");
      downbutton.classList.add("fa-chevron-down");
    }
  }
  // edit icon hide
  iconhide() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
  //  console.log('curent user', id);
    // debugger;
    if (id == 3) {
      this.show = false;
      this.hasuser = true;
    }
  }

}