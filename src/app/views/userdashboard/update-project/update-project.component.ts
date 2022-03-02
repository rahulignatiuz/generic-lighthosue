import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { UserService } from '../../../_services/user.service';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Lesson } from '../../../_models/lesson';
import { User } from '../../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AmdDependency, NumberLiteralType } from 'typescript';
import { Title } from '@angular/platform-browser';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('attachments', { static: false }) public attachments: ElementRef;
  public projectsAsObjects: any;
  maxChars = 250;
  public projectsAsType: any;
  public projectsPhaseAsObjects: any;
  public projectsPhaseMilestoneAsObjects: any;
  public keywordsAsObjects: any;
  public categoriesAsObjects: any;
  public lifecycleAsObjects: any;
  public milestonesAsObjects: any;
  public phaseAsObjects: any;
  public impactlevelAsObjects: any;
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
  public projectNameID: number;
  /* ----------- */
  public lessonFormbtn: boolean = false;
  public additionalFormbtn: boolean = false;
  public showIssues: boolean = true;
  public showPractice: boolean = false;
  public projectNameValue: string;
  public projectPhaseValue: string;
  public projectName: string;
  public getProjectName: any;
  public projectNumber: string;
  public projectPahse: string;
  public projectPahseMilestone: string;
  public showLoader: boolean = false;
  public _projectName: string;
  public _projectType: string;
  public _projectPhase: string;
  public typeoflesson: string = 'issue';
  public issuedescription: string;
  public show: boolean = false;
  public title: string;
  public rootcause: string;
  public Recommendation: string;
  public _Keywords: any[] = [];
  public impectcategory: string = '';
  public lifecycle: string = '';
  public impectlevel: string = '';
  public editData: any;
  public projectID: number;
  public attachmentFiles;
  public lessonForm: FormGroup;
  public lessonProcessForm: FormGroup;
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
  public attachmentID: number;
  public isLoader: boolean = true;
  public department: any;
  public function: any;
  public LPN: string;
  public dropdownSettings: IDropdownSettings = {};
  public currentFileUrl: any;
  public currentFileName: any;
  public IsAttachmentExists: boolean = false;
  public fileDelete: boolean = false;
  public IsChangeAttachment: boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private titleService: Title) {
    console.log("+++++++++++++++++++++++++++++++++++constructor+++++++++++++++++++++++++++++++++++++++++++");
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
    this.getProjectPhase();
    this.getProjecttype();
    this.getProjects();
    this.getdepartments();
    this.getfunctions();
    this.getlifecycle();
    this.titleService.setTitle('Lighthouse | Edit Project');
  }

  ngOnInit() {
    console.log("+++++++++++++++++++++++++++++++++++ngOnInit+++++++++++++++++++++++++++++++++++++++++++");
    if (this.isupdate) {
      this.department = [
        { ID: this.editData.departmentID, Name: this.editData.department }
      ];
      this.function = [
        { ID: this.editData.functionID, Name: this.editData.functions }
      ];
    } else {
      this.route.params.subscribe(routeParams => {
        // console.log('routeParams 1', routeParams);
        if (routeParams && routeParams.id) {
          const rid = routeParams.id;
          this.URLlessonID = rid;
          if (this.URLlessonID) {
            setTimeout(() => {
              console.log("+++++++++++++++++++++++++++++++++++ngOnInit+++++++++++++++++Wait one second++++++++++++++++++++++++++", this.URLlessonID);
              this.getlessonbyid(this.URLlessonID);
            }, 1000);
          }
        }
      });
      this.lessonFormInit();
      this.processFormInit();
    }
    // console.log(this.selectedItems);
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
  }

  // Lession Form Init
  lessonFormInit() {
    this.lessonForm = this.formBuilder.group({
      impectlevel: ['', Validators.required],
      impectcategory: ['', Validators.required],
      lifecycle: ['', Validators.required],
      _Keywords: ['', Validators.required],
      Recommendation: ['', Validators.required],
      rootcause: ['', Validators.required],
      issuedescription: ['', Validators.required],
      title: ['', Validators.required],
      typeoflesson: ['', Validators.required],
      _projectphasemilestone: ['', Validators.required],
      _projectPhase: ['', Validators.required],
      projectNumber: ['', Validators.required],
      _projectname: ['', Validators.required],
      _projectType: ['', Validators.required],
      department: ['', Validators.required],
      function: ['', Validators.required],
      attachments: null
    });
  }

  // Process Form Init
  processFormInit() {
    this.lessonProcessForm = this.formBuilder.group({
      impectlevel: ['', Validators.required],
      impectcategory: ['', Validators.required],
      _Keywords: ['', Validators.required],
      Recommendation: ['', Validators.required],
      rootcause: ['', Validators.required],
      issuedescription: ['', Validators.required],
      title: ['', Validators.required],
      typeoflesson: ['', Validators.required],
      _projectphasemilestone: ['', Validators.required],
      _projectPhase: ['', Validators.required],
      projectNumber: ['', Validators.required],
      _projectType: ['', Validators.required],
      _projectname: ['', Validators.required],
      department: ['', Validators.required],
      function: ['', Validators.required],
      attachments: null
    });


  }
  iconhide() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
    console.log('curent user', id);
    if (id == 3) {
      this.show = false;
    }
  }

  // form fill with getlessonid api
  getlessonbyid(ID) {
    this.isupdate = true;
    this.isLoader = true;
    this.userService.getlessonbyProjectID(ID).subscribe((data) => {
      console.log("+++++++++++++++++++++++++++++++++++getlessonbyid+++++++++++++++++++++++++++++++++++++++++++");
      // console.log(data.result[0])
      // console.log(data.result)
      //  
      if (data.status) {
        this.isLoader = false;
        this.editData = data.result[0];
        console.log("++++++++++++++++++data-----------------", data);
        console.log("++++++++++++++++++this.editData.departmentID-----------------", this.editData.departmentID);
        console.log("++++++++++++++++++this.editData.functionID-----------------", this.editData.functionID);
        //  console.log(this.editData)
        //  console.log(this.lessonForm);
        this.projectTypeCheck(this.editData.projecttype);
        this.lessonForm.controls['_projectType'].setValue(this.editData.projecttypeID);
        this.lessonForm.controls['projectNumber'].setValue(this.editData.LPN);
        this.lessonForm.controls['_projectPhase'].setValue(this.editData.phaseID);
        this.lessonForm.controls['_projectphasemilestone'].setValue(this.editData.milestonesID);
        this.lessonForm.controls['issuedescription'].setValue(this.editData.IssueDescription);
        this.lessonForm.controls['title'].setValue(this.editData.Title);
        this.lessonForm.controls['rootcause'].setValue(this.editData.RootCause);
        this.lessonForm.controls['Recommendation'].setValue(this.editData.Recommendation);
        this.lessonForm.controls['lifecycle'].setValue(this.editData.lifecycleID);
        this.lessonForm.controls['impectcategory'].setValue(this.editData.impactcategoryID);
        this.lessonForm.controls['impectlevel'].setValue(this.editData.impactlevelID);
        this.lessonForm.controls['typeoflesson'].setValue(this.editData.TypeID);
        this.lessonForm.controls['department'].setValue(this.editData.departmentID);
        this.lessonForm.controls['function'].setValue(this.editData.functionID);
        this.ngOnInit();
        // console.log(this.lessonForm);
        if (this.editData.TypeID == 2) {
          this.showIssues = false;
          this.showPractice = true;
        } else {
          this.showIssues = true;
          this.showPractice = false;
        }
        if (this.editData.LPN) {
          this.LPN = this.editData.LPN
        }
        this.getProjectName = ([this.editData.projectname]);
        this.lessonForm.controls['_projectname'].setValue(this.getProjectName);
        this.userService.getAllKeywordsByID(ID).subscribe((data) => {
          //  console.log(data);
          if (data.status) {
            this.lessonForm.controls['_Keywords'].setValue(data.result);
          }
        });

        // this._projectname = this.editData.projectname;
        // this.projectNumber = this.editData.LPN;
        // this._projectPhase = this.editData.phase;
        // this.issuedescription = this.editData.IssueDescription;
        // this.title = this.editData.Title;
        // this.rootcause = this.editData.RootCause;
        // this.Recommendation = this.editData.Recommendation;
        // this.impectcategory = this.editData.impactcategory;
        // this.impectlevel = this.editData.impactlevel;
        // this.department = this.editData.department;
        // this.functions = this.editData.functions;
      }
    });
    this.userService.getAttachmentNameByID(ID).subscribe((data) => {
      //  console.log("file name", data)
      if (data.status) {
        this.IsAttachmentExists = true;
        //  console.log("file name", data.result[0].OriginalName)
        this.currentFileName = data.result[0].OriginalName;
        this.currentFileUrl = data.result[0].Url;
      } else {
        this.IsChangeAttachment = true;
      }

    });

  }
  openFileInput() {
    this.IsAttachmentExists = false;
    this.IsChangeAttachment = true;
    this.fileDelete = false;
  }
  continueCurrentFile() {

    this.IsAttachmentExists = true;
    this.IsChangeAttachment = false;
    this.fileDelete = false;
  }
  //Check Project type 
  projectTypeCheck(projectType) {
    console.log("++++++++projectsAsType+++++projectsAsType++++++projectsAsType", this.projectsAsType);

    let productID = this.projectsAsType.filter(product => product.Name === projectType).map(product => product.ID);

    this.getMappingProjectTypeAndProject(productID[0]);
    this.getMappingProjectTypeAndPhase(productID[0]);
    this.getMappingProjectAndMilestone(productID[0]);
  }

  reloadaction() {
    window.location.reload();
  }


  AddStatusFilter(e) {
    const target = e.target;
    const selectedIndex = target.selectedIndex;
    const targetid = target.options[selectedIndex].id;
    this.projectNameValue = target.value;
    if (targetid) {
      this.projectNumber = targetid;
    } else {

      this.projectNumber = '';
    }

  }

  // togglelessonFlow(e, lf) {

  //   const target = e.target;
  //   // let value = target.value;
  //   if (lf == 'project') {
  //     this.isProject = true;
  //     this.isProcess = false;
  //   } else if (lf == 'Process') {
  //     this.isProject = false;
  //     this.isProcess = true;

  //   }


  // }
  // togglelessonFlow(e, lf) {

  //   let target = e.target;
  //   let value = target.value;
  //   if (lf == 'project') {
  //     this.router.navigate(['/user/app-lesson-record']);
  //   } else if (lf == 'Process') {
  //     this.router.navigate(['/user/add-process']);

  //   }

  // }
  // onItemAdded(e) {
  //   debugger
  // }

  onFileChangeProject(event) {
    // let reader = new FileReader();
    //console.log(this.attachments.nativeElement.files);
    if (this.attachments.nativeElement.files && this.attachments.nativeElement.files.length > 0) {
      let file = this.attachments.nativeElement.files[0];
      this.attachmentFiles = file;
      // reader.readAsDataURL(file);
      this.lessonForm.get('attachments').setValue({
        filename: Date.now() + '_' + file.name,
        filetype: file.type,
        value: file
      })

    }
  }
  resetAttach() {
    this.attachments.nativeElement.value = "";
    this.attachmentFiles = "";
  }

  deleteCurrentFile() {
    this.fileDelete = true;
    this.IsAttachmentExists = false;
    this.IsChangeAttachment = false;
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
      // console.log(ProjecttypeID);
      if (data.status) {
        this.mappingProjectTypeAndProject = data.result;

      }
    });
  }
  getMappingProjectAndMilestone(ProjecttypeID) {
    this.userService.getMappingProjectAndMilestone(ProjecttypeID).subscribe((data) => {
      //console.log(data);
      if (data.status) {
        this.mappingProjectAndMilestone = data.result;

      }
    });

  }
  getMappingProjectTypeAndPhase(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndPhase(ProjecttypeID).subscribe((data) => {
      // console.log(data);
      if (data.status) {
        this.MappingProjectTypeAndPhase = data.result;

      }
    });
  }
  getcategories() {
    this.isLoader = false;
    this.userService.getcategories().subscribe((data) => {
      console.log("+++++++++++++++++++++++++++++++++++getcategories+++++++++++++++++++++++++++++++++++++++++++");
      if (data.status) {
        this.categoriesAsObjects = data.result;
      }
    });
  }
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getlifecycle+++++++++++++++++++++++++++++++++++++++++++");
        this.lifecycleAsObjects = data.result;
      }
    });
  }

  getmilestones() {
    this.userService.getmilestones().subscribe((data) => {
      // console.log(data);
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getmilestones+++++++++++++++++++++++++++++++++++++++++++");
        this.milestonesAsObjects = data.result;
      }
    });
  }

  getKeywords() {
    this.userService.getKeywords().subscribe((data) => {
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getKeywords+++++++++++++++++++++++++++++++++++++++++++");
        this.keywordsAsObjects = data.result;
      }
    });
  }
  getimpactlevel() {
    this.userService.getimpactlevel().subscribe((data) => {
      // console.log(data);
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getimpactlevel+++++++++++++++++++++++++++++++++++++++++++");
        this.impactlevelAsObjects = data.result;
      }
    });
  }
  getdepartments() {
    this.userService.getdepartments().subscribe((data) => {
      // console.log(data);
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getdepartments+++++++++++++++++++++++++++++++++++++++++++");
        this.departmentAsObjects = data.result;
      }
    });
  }
  getfunctions() {
    this.userService.getfunctions().subscribe((data) => {
      // console.log(data);
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getfunctions+++++++++++++++++++++++++++++++++++++++++++");
        this.functionAsObjects = data.result;
      }
    });
  }

  public onselectProjecttype(e) {
    //console.log(e.target.value, "Select value");

    //let productID = this.projectsAsType.filter(product => product.Name === e.target.value).map(product => product.ID);
    //console.log(productID[0], "find id from selected value");
    //console.log(this.projectNumber, "find id from selected value")

    this._projectName = '';
    this.projectNumber = '';
    this.mappingProjectTypeAndProject = [];
    //this.projectsPhaseAsObjects = [];
    //this.mappingProjectAndMilestone = [];
    // this.projectFormFields();
    this.getMappingProjectTypeAndProject(e.target.value);
    this.getMappingProjectTypeAndPhase(e.target.value);
    this.getMappingProjectAndMilestone(e.target.value);


  }

  public onselectProject(tag) {
    // const confirm = window.confirm('Do you really want to add this tag?');
    // console.log(tag);
    // this.projectName   = tag.projectName;
    const lpn = tag.LPN;
    this.LPN = tag.LPN
    if (lpn) {
      this.projectNumber = lpn;

    } else {
      this.projectNumber = '';
    }
    const a = document.getElementsByClassName("ng2-tag-input__text-input")[0];
    a.classList.remove("mystyle");
    // this.getMappingProjectAndMilestone()
    // this.getProjectPhase();
    // this.projectFormFields();
  }

  addIgnoreColumn(column: any) {
    this._Keywords.push(<any>column);
    // console.log(column);
  }
  onKeywordsRemoved(column: any) {
    const index: number = this._Keywords.indexOf(<any>column);
    if (index !== -1) {
      this._Keywords.splice(index, 1);
    }
  }

  public onProjectRemoved(tag) {
    this.projectNumber = '';
    // this.projectName = '';
    // this.projectsPhaseAsObjects = [];
    // this.mappingProjectAndMilestone = [];
    // this.projectFormFields();
    const a = document.getElementsByClassName("ng2-tag-input__text-input")[0];
    a.classList.add("mystyle");
  }
  public getProjectPhase() {
    this.userService.getProjectPhase().subscribe((data) => {
      // console.log(data);
      if (data.status) {
        console.log("+++++++++++++++++++++++++++++++++++getProjectPhase+++++++++++++++++++++++++++++++++++++++++++");
        this.projectsPhaseAsObjects = data.result;
      }
    });
  }
  public onselectProjectPhase(event) {
    // const confirm = window.confirm('Do you really want to add this tag?');
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.projectPahse = selectElementText;
    this.getProjectPhaseMilestone(event.target.value);
    this.projectFormFields();
  }

  public onProjectPhaseRemoved(tag) {
    this.projectPahse = '';
    this.projectFormFields();
  }

  public onselectMilestone(event) {
    // const confirm = window.confirm('Do you really want to add this tag?');
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.projectPahseMilestone = selectElementText;
    this.projectFormFields();
  }

  public onMilestonRemoved(tag) {
    this.projectPahseMilestone = '';
    this.projectFormFields();
  }
  public getProjectPhaseMilestone(id) {
    const phaseId = id ? id : 0;
    this.userService.getProjectPhaseMilestone(phaseId).subscribe((data) => {
      if (data.status) {
        this.projectsPhaseMilestoneAsObjects = data.result;
      }
    });
  }
  // next tab method
  public tabChange(index) {
    // console.log('Tab Index ', index);
    //  console.log("From Value of tab 1", this.lessonForm.value);

    this.projectTab = false;
    this.lessonTab = false;
    this.additionalTab = false;

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

  public projectFormFields() {
    // console.log(this.projectName , this.projectNumber , this.projectPahse , this.projectPahseMilestone);
    if (this.projectName && this.projectNumber && this.projectPahse && this.projectPahseMilestone) {
      this.lessonFormbtn = false;
    } else {
      this.lessonFormbtn = false;
    }
  }

  public lessonFormFields() {
    //console.log(this.typeoflesson , this.issuedescription , this.rootcause , this.Recommendation, this._Keywords);            
    if (this.typeoflesson && this.issuedescription && this.rootcause && this.Recommendation && this._Keywords.length > 0) {
      this.additionalFormbtn = false;
    } else {
      this.additionalFormbtn = false;
    }
  }

  public onselecttypeoflesson(event) {
    //  console.log(event.target.value)   
    if (event.target.value == 2) {
      this.showIssues = false;
      this.showPractice = true;
    } else {
      this.showIssues = true;
      this.showPractice = false;
    }
    // this.lessonFormFields();
  }

  get formControls() { return this.lessonForm.controls; }
  get processFormControls() { return this.lessonProcessForm.controls; }
  deletelesson(URLlessonID) {
    this.userService.deletelesson(this.URLlessonID).subscribe((data) => {
      this.results = data.result;
      this.router.navigate(['/user/mylessons-project']);
    });
  }
  updateLesson(form: NgForm) {
    // console.log("updateLesson1");
    this.isSubmitted = true;
    const _user: any = JSON.parse(localStorage.getItem('currentUser'));
    if (form.value.typeoflesson == 2) {
      this.rootcause = "undefined";
    }
    if (form.value._projectname[0].ID) {
      this.projectNameID = form.value._projectname[0].ID;
    } else {
      this.projectNameID = this.editData.projectID;
    }
    const o: any = {
      UserID: _user.ID,
      ID: this.URLlessonID,
      LessonTypeID: 1,
      ProjectTypeID: form.value._projectType,
      ProjectID: this.projectNameID,
      PhaseID: form.value._projectPhase,
      TypeID: form.value.typeoflesson,
      ImpactCategoryID: form.value.impectcategory,
      LifeCycleID: form.value.lifecycle,
      ImpactLevelID: form.value.impectlevel,
      MilestoneID: form.value._projectphasemilestone,
      Title: form.value.title,
      DepartmentID: form.value.department[0].ID,
      FunctionID: form.value.function[0].ID,
      IssueDescription: form.value.issuedescription,
      RootCause: this.rootcause,
      keywords: form.value._Keywords,
      Recommendation: form.value.Recommendation,
      AttachmentsURL: '',
      UpdatedBy: _user.ID,
      IsEnabled: 1
    };
    this.showLoader = true;
    if (this.attachmentFiles) {
      const formData = new FormData();
      formData.append('attachment', this.attachmentFiles);
      this.userService.uploadFile(formData).subscribe((data) => {
        if (data.status) {
          this.attachmentID = data.data.insertId;
          this.userService.updateLesson(o).subscribe((data) => {
            if (data.status) {
              this.userService.deleteAttachmnet(this.URLlessonID).subscribe((data) => {
                if (data.status) {
                  this.userService.addMappingLessonAttachmentSQL(this.URLlessonID, this.attachmentID).subscribe((data) => {
                    this.myModal.show();
                    this.showLoader = false;
                    this.router.navigate(['/']);

                  });
                }
              });

            }
          });
        }
      });
    } else if (this.fileDelete) {
      this.userService.updateLesson(o).subscribe((data) => {
        if (data.status) {
          try {
            this.userService.deleteAttachmnet(this.URLlessonID).subscribe((data) => {
              if (data.status) {
                this.myModal.show();
                this.showLoader = false;
                this.router.navigate(['/']);
              }
            });
          } catch (error) {
            this.myModal.show();
            this.showLoader = false;
            this.isupdate = false;
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      this.userService.updateLesson(o).subscribe((data) => {
        if (data.status) {
          this.myModal.show();
          this.showLoader = false;
          this.router.navigate(['/']);
        }
      });
    }
  }

}

