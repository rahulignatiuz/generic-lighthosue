import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';
import { UserService } from '../../../_services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddLessonComponent implements OnInit {
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('bulkimport', { static: false }) public bulkimport: ModalDirective;


  maxChars = 250;
  public projectsAsObjects: any;
  public projectsAsType: any;
  public projectsPhaseAsObjects: any;
  public projectsPhaseMilestoneAsObjects: any;
  public keywordsAsObjects: any;
  public categoriesAsObjects: any;
  public milestonesAsObjects: any;
  public phaseAsObjects: any;
  public impactlevelAsObjects: any;
  public lifecycleAsObjects: any;
  public mappingProjectAndMilestone: any;
  public MappingProjectTypeAndPhase: any;
  public mappingProjectTypeAndProject: any;
  public projectItems: any;
  public projectTab: boolean = true;
  public lessonTab: boolean = false;
  public additionalTab: boolean = false;
  public projectdTab: boolean = false;
  public lessondTab: boolean = true;
  public additionaldTab: boolean = true;
  public departmentAsObjects: any;
  public functionAsObjects: any;
  public deletelesson: any;
  public lessonFormbtn: boolean = false;
  public additionalFormbtn: boolean = false;
  public showIssues: boolean = true;
  public showPractice: boolean = false;
  public projectNameValue: string;
  public projectPhaseValue: string;
  // projectName: string;
  public projectNumber: string;
  public projectPahse: string;
  public projectPahseMilestone: string;
  public _projectName: string;
  public _projectType: string;
  public _projectPhase: string;
  public typeoflesson: string;
  public issuedescription: string;
  public title: string;
  public rootcause: string;
  public Recommendation: string;
  public _Keywords: any[] = [];
  public impectcategory: string = '';
  public lifecycle: string = '';
  public impectlevel: string = '';
  public lessonForm: FormGroup;
  public isSubmitted = false;
  public errForms: boolean = false;
  public uploadedFiles: Array<File>;
  public isProject: boolean = true;
  public isProcess: boolean = false;
  public projectNumberDisabled: boolean;
  public lf: string;
  public results: any[];
  public isupdate: boolean = false;
  public lessonID: number;
  public _projectname: String;
  public URLlessonID: number;
  public _projectphasemilestone: string;
  public attachmentFiles;
  public attachmentID: number;
  public keywordArr: any;
  public showLoader: boolean = false;
  public LPN: string;
  public dropdownSettings: IDropdownSettings = {};
  public lessontypeAsObjects: any;
  public bulkAttachment: File = null;
  public bulkImporing: boolean = false;
  public bulkImportSuccess: boolean = false;
  public xlFileName: string;
  public xlFileNameWithoutExt: string;
  public bulkErrorCount: number = 0;
  public importID: number = 0;
  public somethingMissingError: boolean = false;
  public function: any;
  public isClickFunction: boolean = false;
  public isClickDepartment: boolean = false;
  // public isFunctionValid : boolean = false;
  // public islifecycleValid : boolean = false;

  //columns: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private titleService: Title) {
    TagInputModule.withDefaults({
      tagInput: {
        placeholder: '',
        // add here other default values for tag-input
      },
      dropdown: {
        displayBy: '',
        // add here other default values for tag-input-dropdown
      }
    });

    this.getcategories();
    this.getKeywords();
    this.getmilestones();
    this.getimpactlevel();
    this.getdepartments();
    this.getfunctions();
    this.getProjectPhase();
    this.getProjecttype();
    this.getProjects();
    this.getlessontype();
    this.getlifecycle();
    this.titleService.setTitle("Lighthouse | Add Project");
  }

  ngOnInit() {
    this.lessonForm = this.formBuilder.group({
      impectlevel: ['', Validators.required],
      impectcategory: ['', Validators.required],
      lifecycle: ['', Validators.required],
      _Keywords: ['', Validators.required],
      Recommendation: ['', Validators.required],
      rootcause: ['', Validators.required],
      issuedescription: ['', [Validators.required, Validators.maxLength(250)]],
      title: ['', Validators.required],
      typeoflesson: ['', Validators.required],
      _projectphasemilestone: ['', Validators.required],
      _projectPhase: ['', Validators.required],
      projectNumber: ['', Validators.required],
      _projectname: ['', Validators.required],
      _projectType: ['', Validators.required],
      department: ['', Validators.required],
      function: ['', Validators.required],
      bulk1: ['', Validators.required],
      attachments: null
    })
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      itemsShowLimit: 1,
      enableCheckAll: false,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.lf = 'project';
    this.typeoflesson = "";
    this.masterlistproject();
  }
  masterlistproject() {
    localStorage.removeItem("tabforprocess");
    localStorage.removeItem("tabID");
    var projectradiobuttn = "project";
    var projecttabselection = "tab1"
    localStorage.setItem("tabforprocess", projectradiobuttn);
    localStorage.setItem("tabID", projecttabselection);
  }
  //private columnsToIgnore: any[] = [];

  addIgnoreColumn(column: any) {
    this._Keywords.push(<any>column);
    console.log(column);
  }
  get formControls() { return this.lessonForm.controls; }
  reloadaction() {
    window.location.reload();
  }
  importBulkFile() {
    this.bulkErrorCount = 0;
    this.bulkImporing = false;
    this.bulkImportSuccess = false;
    this.bulkAttachment = null;
    this.xlFileName = '';
    this.importID = 0;
    this.bulkimport.show();
    // this.modalService.show(bulkimport);
    // document.getElementById('id04').style.display='block';
  }
  importBulkFileHistory() {
    this.router.navigate(['/user/bulk-import/' + this.importID]);

  }
  onFileChangeBulkProject(event) {
    this.xlFileName = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.bulkAttachment = file;
      this.xlFileName = this.bulkAttachment.name;
    }
  }

  addBulk(e) {
    var bulkuploadvalue = document.getElementById('remove');
    bulkuploadvalue.style.display = "flex";
    console.log(e.value);
    if (e.value != "") {
      e.value = '';
      var bulkuploadvalue = document.getElementById('remove');
      bulkuploadvalue.style.display = "none";
      this.bulkimport.hide();
      this.bulkImporing = true;
      this.somethingMissingError = false;
      const formData = new FormData();
      this.xlFileNameWithoutExt = this.bulkAttachment.name.split('.').slice(0, -1).join('.');
      let User: any = JSON.parse(localStorage.getItem('currentUser'));
      formData.append('bulkcsv', this.bulkAttachment);
      formData.append('UserID', User.ID);
      this.userService.uploadbulkFile(formData).subscribe((data) => {
        if (data.status) {
          this.bulkErrorCount = data.result.errorCount;
          this.importID = data.result.importID
          this.bulkImporing = false;
          this.bulkImportSuccess = true;
          this.somethingMissingError = false;
        } else {
          this.bulkImportSuccess = false;
          this.bulkImporing = false;
          this.somethingMissingError = true;
        }
        // document.getElementById('id04').style.display='none';
      });
    }
  }
  onClickFunction() {
    this.isClickFunction = true;
  }
  onFunctionSelect() {
    this.isClickFunction = false;
  }
  onClickDepartment() {
    this.isClickDepartment = true;
  }
  onDepartmentSelect() {
    this.isClickDepartment = false;
  }
  bulkImportClose() {
    this.bulkImporing = false;
  }
  bulkImportSuccessClose() {
    this.bulkImportSuccess = false;
  }
  somethingMissingErrorClose() {
    this.somethingMissingError = false;

  }
  gotoBuklImport(importID) {
    this.router.navigate(['/user/bulk-import/' + importID]);
  }
  closeBulkImportModule() {
    this.bulkimport.hide();
  }

  AddStatusFilter(e) {
    let target = e.target;
    let selectedIndex = target.selectedIndex;
    let targetid = target.options[selectedIndex].id;
    this.projectNameValue = target.value;
    if (targetid) {
      this.projectNumber = targetid;
    } else {

      this.projectNumber = "";
    }

  }
  // used to navigate if user select project or process
  togglelessonFlow(e, lf) {

    let target = e.target;
    let value = target.value;
    if (lf == 'project') {
      this.router.navigate(['/user/add-project']);
    } else if (lf == 'Process') {
      this.router.navigate(['/user/add-process']);
    }
  }
  // for issue or best practice
  getlessontype() {
    console.log('data');
    this.userService.getlessontype().subscribe((data) => {

      this.lessontypeAsObjects = data.result;

    });
  }
  onFileChangeProject(event) {
    // let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.attachmentFiles = file;
      // reader.readAsDataURL(file);
      this.lessonForm.get('attachments').setValue({
        filename: Date.now() + '_' + file.name,
        filetype: file.type,
        value: file
      });

    }
  }


  getProjects() {
    this.userService.getProjects().subscribe((data) => {
      if (data.status) {
        this.projectsAsObjects = data.result;
      }
    });
  }
  getProjecttype() {
    this.userService.getProjecttype().subscribe((data) => {
      if (data.status) {
        this.projectsAsType = data.result;

      }
    });

  }
  getMappingProjectTypeAndProject(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndProject(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.mappingProjectTypeAndProject = data.result;

      }
    });
  }
  getMappingProjectAndMilestone(ProjecttypeID) {
    this.userService.getMappingProjectAndMilestone(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.mappingProjectAndMilestone = data.result;

      }
    });

  }
  getMappingProjectTypeAndPhase(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndPhase(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.MappingProjectTypeAndPhase = data.result;

      }
    });
  }
  getcategories() {
    this.userService.getcategories().subscribe((data) => {
      this.categoriesAsObjects = data.result;
    });
  }

  getmilestones() {
    this.userService.getmilestones().subscribe((data) => {
      this.milestonesAsObjects = data.result;
    });
  }

  getKeywords() {
    this.userService.getKeywords().subscribe((data) => {
      if (data.status) {
        this.keywordsAsObjects = data.result;
        // this.columns = data.result;
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
      // console.log(data);
      this.departmentAsObjects = data.result;

    });
  }
  getfunctions() {
    this.userService.getfunctions().subscribe((data) => {
      //  console.log(data);
      this.functionAsObjects = data.result;

    });
  }
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      this.lifecycleAsObjects = data.result;
    });
  }

  public onselectProjecttype(e) {
    //console.log(this.projectName)
    // console.log(e.target.value)
    this._projectName = '';
    this.projectNumber = '';
    this.mappingProjectTypeAndProject = [];
    //  this.projectsPhaseAsObjects = [];
    // this.mappingProjectAndMilestone = [];
    this.getMappingProjectTypeAndProject(e.target.value);
    this.getMappingProjectTypeAndPhase(e.target.value);
    this.getMappingProjectAndMilestone(e.target.value);
    const a = document.getElementsByClassName("ng2-tag-input__text-input")[0];
    a.classList.add("mystyle");

  }
  remove() {
    var x = document.getElementById("id202");
    x.classList.remove("top3");

  }
  //used to add lpn no.
  public onselectProject(tag) {
    let lpn = tag.LPN
    this.LPN = tag.LPN
    if (lpn) {
      this.projectNumber = lpn;

    } else {
      this.projectNumber = "";
    }
    const a = document.getElementsByClassName("ng2-tag-input__text-input")[0];
    a.classList.remove("mystyle");
    //this.getMappingProjectAndMilestone()
    // this.getProjectPhase();
    // this.projectFormFields();
  }

  onKeywordsRemoved(column: any) {
    const index: number = this._Keywords.indexOf(<any>column);
    if (index !== -1) {
      this._Keywords.splice(index, 1);
    }
  }

  public onProjectRemoved(tag) {
    this.projectNumber = '';
    const a = document.getElementsByClassName("ng2-tag-input__text-input")[0];
    a.classList.add("mystyle");

  }

  public getProjectPhase() {
    this.userService.getProjectPhase().subscribe((data) => {
      this.projectsPhaseAsObjects = data.result;
    });
  }



  public onselectProjectPhase(event) {
    //const confirm = window.confirm('Do you really want to add this tag?');    
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;
    this.projectPahse = selectElementText;
    this.getProjectPhaseMilestone(event.target.value);
    // this.projectFormFields();
  }

  public onProjectPhaseRemoved(tag) {
    this.projectPahse = '';
    // this.projectFormFields();
  }

  public onselectMilestone(event) {
    //const confirm = window.confirm('Do you really want to add this tag?');    
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;
    this.projectPahseMilestone = selectElementText;
    // this.projectFormFields();
  }

  public onMilestonRemoved(tag) {
    this.projectPahseMilestone = '';
    // this.projectFormFields();
  }

  public getProjectPhaseMilestone(id) {
    let phaseId = id ? id : 0;
    this.userService.getProjectPhaseMilestone(phaseId).subscribe((data) => {
      if (data.status) {
        this.projectsPhaseMilestoneAsObjects = data.result;
      }
    });
  }

  public tabChange(index) {
    this.projectTab = false;
    this.lessonTab = false;
    this.additionalTab = false;
    var x = document.getElementById("id202");
    x.classList.add("top3");
    this.projectdTab = true;
    this.lessondTab = true;
    this.additionaldTab = true;

    if (index == 1) {
      this.projectTab = true;
      this.projectdTab = false;
    }
    if (index == 2) {
      this.lessonTab = true;
      this.lessondTab = false;
    }
    if (index == 3) {
      this.additionalTab = true;
      this.additionaldTab = false;
    }

  }

  // public projectFormFields() {    
  //   if(this.projectName && this.projectNumber && this.projectPahse && this.projectPahseMilestone) {
  //     this.lessonFormbtn = false;    
  //   } else {
  //     this.lessonFormbtn = false;
  //   } 
  // }

  public lessonFormFields() {
    if (this.typeoflesson && this.issuedescription && this.rootcause && this.Recommendation && this._Keywords.length > 0) {
      this.additionalFormbtn = false;
    } else {
      this.additionalFormbtn = false;
    }
  }

  public onselecttypeoflesson(event) {
    if (event.target.value == 2) {
      this.showIssues = false;
      this.showPractice = true;
    } else {
      this.showIssues = true;
      this.showPractice = false;
    }
    this.lessonFormFields();
  }

  updateLPN(ID) {
    let id = ID.toString();
    this.userService.getProjectByID(id).subscribe((data) => {
      let lpn = this.projectNumber;
      if (!data.result[0].LPN) {
        this.userService.updateLPN(id, lpn).subscribe((data) => {
        })
      }
    });
  }

  addLesson(form: NgForm) {
    this.isSubmitted = true;
    this.updateLPN(form.value._projectname[0].ID);
    let _user: any = JSON.parse(localStorage.getItem('currentUser'));
    let o: any = {
      UserID: _user.ID,
      LessonTypeID: 1,
      ProjectTypeID: form.value._projectType,
      ProjectID: form.value._projectname[0].ID,
      PhaseID: form.value._projectPhase,
      TypeID: form.value.typeoflesson,
      ImpactCategoryID: form.value.impectcategory,
      ImpactLevelID: form.value.impectlevel,
      Title: this.title,
      MilestoneID: form.value._projectphasemilestone,
      LifeCycleID: form.value.lifecycle,
      DepartmentID: form.value.department[0].ID,
      FunctionID: form.value.function[0].ID,
      IssueDescription: this.issuedescription,
      RootCause: this.rootcause,
      Keywords: this._Keywords,
      Recommendation: this.Recommendation,
      CreatedBy: _user.ID,
      LPN: this.projectNumber,
      IsEnabled: 1
    };
    this.isupdate = false;
    this.showLoader = true;
    if (this.attachmentFiles) {
      const formData = new FormData();
      formData.append('attachment', this.attachmentFiles);
      //this.uploadAttachment(formData);
      this.userService.uploadFile(formData).subscribe((data) => {
        if (data.status) {
          this.attachmentID = data.data.insertId;
          this.userService.addLesson(o).subscribe((data) => {
            if (data.status) {
              this.userService.addMappingLessonAttachmentSQL(data.result[0].insertId, this.attachmentID).subscribe((data) => {
                //   console.log(data);
                this.showLoader = false;
                this.myModal.show();
                this.router.navigate(['/']);
              });
            }
          });
        }
      });
    } else {
      this.userService.addLesson(o).subscribe((data) => {
        if (data.status) {
          this.showLoader = false;
          this.myModal.show();
          this.router.navigate(['/user/add-project']);
        }
      });
    }
  }
  onSubmit(form: NgForm) {
    this.addLesson(form)
  }
}

// export class Column {
//   index: number;
//   name: string;

//   constructor(index: number, name: string) {
//     this.index = index;
//     this.name = name;
//   }
// }
