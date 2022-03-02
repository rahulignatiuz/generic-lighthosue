import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constant } from '../../../_global/constant';
import { Lesson } from '../../../_models/lesson';
import { Title } from '@angular/platform-browser';
import { IDropdownSettings } from 'ng-multiselect-dropdown'

@Component({
  selector: 'app-mylesson-process',
  templateUrl: './mylesson-process.component.html',
  styleUrls: ['./mylesson-process.component.scss']
})
export class MylessonProcessComponent implements OnInit {
  step = 0;
  results: any[];
  projecttype: any[];
  isloading = false;
  public searchname: string;
  public _baseURL: string;
  public projectsAsType: any;
  public selectedPhases: any;
  public lessontypeAsObjects: any;
  public categoriesAsObjects: any;
  public departmentAsObjects: any;
  public functionAsObjects: any;
  public impactlevelAsObjects: any;
  public likes: number = 0;
  public dropdownSettingsWithSearch: IDropdownSettings = {};
  public dropdownSettingsWithoutSearch: IDropdownSettings = {};
  public searchedKeyword: any;
  public lessontypeID: string = "";
  public typeid: any;
  public impectcategory: string = "";
  public Keywords: string = "";
  public projectPhase: string = "";
  public _projectPhase: string = "";
  public projectName: string = "";
  public departments: string = "";
  public noResult: boolean = false;
  public processID: string = "";
  //pagination
  public p: number = 1;
  public keywordsAsObjects: any;
  public getUserLessonsByFilter: any;
  public processAsObjects: any;
  public SortBy: string;
  public sortbyBD: string;
  public _Keywords: any[] = [];
  public keywordsIDList: any;
  public selectedFunction: any;
  public selectedDepartment: any;
  public selectedlifecycle: any;
  public selectedImpactCategories: any;
  public selectedImpactLevels: any;
  public functionIDList: any = "";
  public departmenIDList: any = "";
  public lifecycleIDList: any = "";
  public lifecycleDropdownList = [];
  public impectcategoryIDList: any = "";
  public impectlevelIDList: any = "";
  public functionDropdownList = [];
  public departmentDropdownList = [];
  public panelOpenState = false;
  public selectLessonType: number;
  public flag: string;
  public userusefullessonAsObjects: any;
  public implement: string;
  public implemented: string;
  public show: boolean = true;
  public hasuser = false;
  public lessonID:any;

  constructor(private router: Router, private userService: UserService, private titleService: Title) {
    this.router.routerState.root.queryParams.subscribe(params => {
      var lessonProcesstID = params['lessonid'];
      console.log("================",lessonProcesstID);
      if(lessonProcesstID){
        this.lessonID = lessonProcesstID.replace(/,\s*$/, "");
        console.log("========if========",this.lessonID);
        this.getLessonsByFilter();
      }else{
        console.log("======else==========",lessonProcesstID);
        this.getUserLessons();
      }
    });
    this._baseURL = Constant.baseURL;
   // this.getUserLessons();
    this.getcategories();
    this.getimpactlevel();
    this.getdepartments();
    this.getfunctions();
    this.getlessontype();
    this.getProcess();
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
    this.selectLessonType = 2;

    this.implemented = "";
    this.iconhide();

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
  expandPanel(matExpansionPanel, event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.close(); // Here's the magic
    }
  }

  private _isExpansionIndicator(target: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';

    return (target['classList'] && target['classList'].contains(expansionIndicatorClass));
  }
  togglelessonFlow(e) {

    let target = e.target;
    let value = target.value;
    if (value == 1) {
      this.router.navigate(['/user/mylessons-project']);
    } else if (value == 2) {
      this.router.navigate(['/user/mylessons-process']);
    }
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
  public onselectProcess(e) {
    this.processID = e.target.value;
    this.getLessonsByFilter();
  }
  public onselectLessontype(e) {
    this.lessontypeID = e.target.value;
    this.getLessonsByFilter();
  }
  getProcess() {
    this.userService.getProcess().subscribe((data) => {
      if (data.status) {
        this.processAsObjects = data.result;
      }
    });
  }
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      this.lifecycleDropdownList = data.result;

    });
  }
  getUserLessons() {
    this.userService.getUserProcessLessons().subscribe((data) => {
      console.log('1', data);
      this.results = data.result;
    });
  }
  onFunctionSelect(item: any) {
    if (this.selectedFunction.length > 0) {
      this.functionIDList = this.selectedFunction;
    } else {
      this.functionIDList = null;
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
  onLifecycleSelect(item: any) {
    if (this.selectedlifecycle.length > 0) {
      this.lifecycleIDList = this.selectedlifecycle;
    } else {
      this.lifecycleIDList = null;
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
    console.log(this.lessontypeID)
    let obj: object = {
      ProcessID: this.processID ? this.processID : "",
      FunctionIDList: this.functionIDList ? this.functionIDList : "",
      DepartmenIDList: this.departmenIDList ? this.departmenIDList : "",
      LifecycleIDList: this.lifecycleIDList ? this.lifecycleIDList : "",
      ImpectCategoryIDList: this.impectcategoryIDList ? this.impectcategoryIDList : "",
      ImpectLevelsIDList: this.impectlevelIDList ? this.impectlevelIDList : "",
      LessontypeID: this.lessontypeID ? this.lessontypeID : "",
      SortBy: this.SortBy ? this.SortBy : "DESC",
      KeywordsIDList: this.keywordsIDList ? this.keywordsIDList : "",
      flag: this.flag ? this.flag : "",
      LessonsID: this.lessonID ? this.lessonID : "",
    };

    this.userService.getAllFilterLessonsProcess(obj).subscribe((data) => {
      if (data.status) {
        this.noResult = false;
        this.results = data.result;
      } else {
        this.noResult = true;
        this.results = [];
      }
    });
  }

  resetFilter() {
    this.processID = "";
    this.searchedKeyword = "";
    this.SortBy = "";
    this.sortbyBD = "";
    this.noResult = false;
    this.flag = "";
    this.implemented = "";
    this.userusefullessonAsObjects = "";
    this.selectedFunction = "";
    this.selectedlifecycle = "";
    this.selectedDepartment = "";
    this.selectedImpactCategories = "";
    this.selectedImpactLevels = "";
    this.projectsAsType = [];
    this.departmentAsObjects = [];
    this.functionAsObjects = [];
    this.impactlevelAsObjects = [];
    this.keywordsAsObjects = [];
    this.categoriesAsObjects = [];
    this.getUserLessons();
    this.getdepartments();
    this.getcategories();
    this.getfunctions();
    this.getimpactlevel();
    this.getlessontype();
    this.getProcess();
    this.getuserusefullesson();
    this.getlifecycle();

  }
  getidinurlProccess(ID) {
    this.router.navigate(['/user/update-process/' + ID]);
  }

  getidlesson(ID) {
    this.router.navigate(['/lesson/lesson-process/' + ID]);
  }

  getlessontype() {
    this.userService.getlessontype().subscribe((data) => {
      console.log(data);
      this.lessontypeAsObjects = data.result;

    });
  }

  getcategories() {
    this.userService.getcategories().subscribe((data) => {

      this.categoriesAsObjects = data.result;

    });
  }
  getKeywords() {
    this.userService.getKeywords().subscribe((data) => {
      if (data.status) {
        this.keywordsAsObjects = data.result;
      }
    });
  }
  getimpactlevel() {
    this.userService.getimpactlevel().subscribe((data) => {
      this.impactlevelAsObjects = data.result;

    });
  }
  getdepartments() {
    this.userService.getdepartments().subscribe((data) => {
      //console.log(data);     
      this.departmentDropdownList = data.result;

    });
  }
  getfunctions() {
    this.userService.getfunctions().subscribe((data) => {
      console.log('2', data);
      this.functionDropdownList = data.result;

    });
  }
  getuserlikes(ID) {
    console.log(ID);
    this.userService.getuserlikes(ID).subscribe((data) => {
      this.getuserlikes = data.result;
      console.log(data);
    });
  }
  likebutton(ID) {
    // console.log(ID)
    this.likes++;

    //     this.userService.getuserlikes(ID).subscribe((data) => {    
    //       this.getuserlikes = data.result;

    //  });
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
  iconhide() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
    console.log('curent user', id);
    // debugger;
    if (id == 3) {
      this.show = false;
      this.hasuser = true;
    }
  }
}