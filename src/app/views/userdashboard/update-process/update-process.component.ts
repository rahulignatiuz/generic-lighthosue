import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Title } from '@angular/platform-browser';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-update-process',
  templateUrl: './update-process.component.html',
  styleUrls: ['./update-process.component.scss']
})
export class UpdateProcessComponent implements OnInit {
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('attachments', { static: false }) public attachments: ElementRef;

  public projectsAsObjects: any;
  public maxChars = 250;

  public projectsAsType: any;
  public projectsPhaseAsObjects: any;
  public projectsPhaseMilestoneAsObjects: any;
  public keywordsAsObjects: any;
  public categoriesAsObjects: any;
  public milestonesAsObjects: any;
  public phaseAsObjects: any;
  public lifecycleAsObjects: any;
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

  public lessonFormbtn: boolean = false;
  public additionalFormbtn: boolean = false;
  public showIssues: boolean = true;
  public showPractice: boolean = false;
  public projectNameValue: string;
  public projectPhaseValue: string;

  public projectName: string;
  public projectNumber: string;
  public projectPahse: string;
  public projectPahseMilestone: string;

  public _projectName: string;
  public _projectType: string;
  public _projectPhase: string;
  public lifecycle: string = '';
  public URLlessonID: number;
  public typeoflesson: string;
  public issuedescription: string;
  public title: string;
  public rootcause: string;
  public Recommendation: string;
  public _Keywords: string[] = [];
  public impectcategory: string = '';
  public impectlevel: string = '';
  public isupdate: boolean = false;
  // lessonForm: FormGroup;
  public lessonProcessForm: FormGroup;
  public isSubmitted = false;
  public errForms: boolean = false;
  public uploadedFiles: Array<File>;
  // isProject: boolean = true;
  public isProcess: boolean = true;
  public projectNumberDisabled: boolean;
  public lf: string;
  public results: any[];
  public lessonID: number;
  public _projectname: String;
  public _projectphasemilestone: string;
  public attachmentFiles;
  public attachmentID: number;
  public showLoader: boolean = false;
  public processAsObjects: any;
  public URLlessonPoccessID: number;
  public editData: any;
  public isLoader: boolean = true;
  public isProject: boolean = true;
  public dropdownSettings: IDropdownSettings = {};
  public department: any = [];
  public function: any = [];
  public currentFileUrl: any;
  public currentFileName: any;
  public IsAttachmentExists: boolean = false;
  public fileDelete: boolean = false;
  public IsChangeAttachment: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, private titleService: Title) {

    this.getcategories();
    this.getKeywords();
    this.getimpactlevel();
    this.getdepartments();
    this.getfunctions();
    this.getProcess();
    this.getlifecycle();
    this.titleService.setTitle("Lighthouse | Edit Process");
  }

  ngOnInit() {
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
          this.URLlessonPoccessID = rid;

          if (this.URLlessonPoccessID) {
            setTimeout(() => {
              this.getLessonProccessByID(this.URLlessonPoccessID);
            }, 1000);
          }
        }
      });
      this.processFormInit();
    }
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ID',
      textField: 'Name',
      itemsShowLimit: 1,
      enableCheckAll: false,
      allowSearchFilter: true,
      closeDropDownOnSelection: true

    };

  }
  processFormInit() {
    this.lessonProcessForm = this.formBuilder.group({
      process: ['', Validators.required],
      impectlevel: ['', Validators.required],
      lifecycle: ['', Validators.required],
      impectcategory: ['', Validators.required],
      _Keywords: ['', Validators.required],
      Recommendation: ['', Validators.required],
      rootcause: ['', Validators.required],
      issuedescription: ['', [Validators.required, Validators.maxLength(250)]],
      title: ['', Validators.required],
      typeoflesson: ['', Validators.required],
      department: ['', Validators.required],
      function: ['', Validators.required],
      attachments: null
    })

    this.lf = 'Process';

  }
  // form fill with getlessonid api
  getLessonProccessByID(ID) {
    this.isupdate = true;
    this.isLoader = true;
    this.userService.getlessonbyProcessID(ID).subscribe((data) => {
      //console.log(ID);
      //  console.log(data.result)
      //  console.log(data)
      this.isLoader = false;
      this.editData = data.result[0];
      //  console.log(this.editData);
      // console.log(this.lessonProcessForm);
      // this.projectTypeCheck(this.editData.projecttype);
      this.lessonProcessForm.controls['process'].setValue(this.editData.ProcessID);
      this.lessonProcessForm.controls['issuedescription'].setValue(this.editData.IssueDescription);
      this.lessonProcessForm.controls['title'].setValue(this.editData.Title);
      this.lessonProcessForm.controls['rootcause'].setValue(this.editData.RootCause);
      this.lessonProcessForm.controls['Recommendation'].setValue(this.editData.Recommendation);
      this.lessonProcessForm.controls['impectcategory'].setValue(this.editData.impactcategoryID);
      this.lessonProcessForm.controls['lifecycle'].setValue(this.editData.lifecycleID);
      this.lessonProcessForm.controls['impectlevel'].setValue(this.editData.impactlevelID);
      this.lessonProcessForm.controls['typeoflesson'].setValue(this.editData.TypeID);
      this.lessonProcessForm.controls['department'].setValue(this.editData.departmentID);
      this.lessonProcessForm.controls['function'].setValue(this.editData.functionID);
      this.ngOnInit();

      // console.log(this.lessonProcessForm);
      if (this.editData.TypeID == 2) {
        this.showIssues = false;
        this.showPractice = true;
      } else {
        this.showIssues = true;
        this.showPractice = false;
      }
      this.userService.getAllKeywordsByID(ID).subscribe((data) => {
        //  console.log(data);
        if (data.status) {
          this.lessonProcessForm.controls['_Keywords'].setValue(data.result);
        }
      });
      // if (this.editData.LPN) {
      //   this.LPN = this.editData.LPN
      // }
      //this._projectName =  this.editData.projectname;


      // this.test = ([this.editData.projectname]);
      // this.lessonForm.controls['_projectname'].setValue(this.test);
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
    });
    this.userService.getAttachmentNameByID(ID).subscribe((data) => {
      console.log("file name", data)
      if (data.status) {
        this.IsAttachmentExists = true;
        console.log("file name", data.result[0].OriginalName)
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
  get processFormControls() { return this.lessonProcessForm.controls; }
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
  reloadaction() {
    window.location.reload();
  }
  onFileChangeProcess(event) {

    if (this.attachments.nativeElement.files && this.attachments.nativeElement.files.length > 0) {
      let file = this.attachments.nativeElement.files[0];
      this.attachmentFiles = file;
      this.lessonProcessForm.get('attachments').setValue({
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

  getProcess() {
    this.userService.getProcess().subscribe((data) => {
      if (data.status) {
        this.processAsObjects = data.result;
      }
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
      // console.log(data);     
      this.impactlevelAsObjects = data.result;

    });
  }
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      this.lifecycleAsObjects = data.result;
    });
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

  public tabChange(index) {
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
  deletelessonProcess(URLlessonPoccessID) {
    console.log(this.URLlessonPoccessID);
    this.userService.deletelesson(this.URLlessonPoccessID).subscribe((data) => {
      this.results = data.result;
      this.router.navigate(['/user/mylessons-process']);
    });
  }

  public projectFormFields() {
    //console.log(this.projectName , this.projectNumber , this.projectPahse , this.projectPahseMilestone);     
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
    this.lessonFormFields();
  }

  updateLessonProcess(form: NgForm) {

    // console.log(form.value);
    //console.log(form.value.process);
    //console.log(form.value);
    this.isSubmitted = true;
    let _user: any = JSON.parse(localStorage.getItem('currentUser'));
    if (form.value.typeoflesson == 2) {
      this.rootcause = "undefined";
    }
    let o: any = {
      UserID: _user.ID,
      ID: this.URLlessonPoccessID,
      LessonTypeID: 2,
      ProcessID: form.value.process,
      TypeID: form.value.typeoflesson,
      ImpactCategoryID: form.value.impectcategory,
      LifeCycleID: form.value.lifecycle,
      ImpactLevelID: form.value.impectlevel,
      Title: this.title,
      IssueDescription: this.issuedescription,
      RootCause: this.rootcause,
      keywords: form.value._Keywords,
      DepartmentID: form.value.department[0].ID,
      FunctionID: form.value.function[0].ID,
      Recommendation: this.Recommendation,
      UpdatedBy: _user.ID,
      IsEnabled: 1
    };
    this.showLoader = true;
    if (this.attachmentFiles) {
      const formData = new FormData();
      formData.append('attachment', this.attachmentFiles);
      this.userService.uploadFile(formData).subscribe((data) => {
        //console.log(this.attachmentID);
        if (data.status) {
          this.attachmentID = data.data.insertId;

          this.userService.updateLesson(o).subscribe((data) => {
            //console.log(data);
            // console.log(this.URLlessonID);
            if (data.status) {
              this.userService.deleteAttachmnet(this.URLlessonPoccessID).subscribe((data) => {
                ////   console.log(data);
                //  console.log(data.status);
                if (data.status) {
                  this.userService.addMappingLessonAttachmentSQL(this.URLlessonPoccessID, this.attachmentID).subscribe((data) => {
                    //   console.log(data);
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
            this.userService.deleteAttachmnet(this.URLlessonPoccessID).subscribe((data) => {
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
