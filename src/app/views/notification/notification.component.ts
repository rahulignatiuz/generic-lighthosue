import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public department: number;
  public departmentAsObjects: any;
  public notificationForm: FormGroup;
  public notificationEditForm: FormGroup;
  public categoriesAsObjects: any;
  public impactlevelAsObjects: any;
  public impectlevel: number;
  public impectcategory: number;
  public projectsAsType: any;
  public projectType: number;
  public MappingProjectTypeAndPhase: any;
  public projectPhase: number;
  public mappingProjectAndMilestone: any;
  public projectphasemilestone: number;
  public mappingProjectTypeAndProject: any;
  public projectname: number;
  public lifecycleAsObjects: any;
  public lifecycle: number;
  public functionAsObjects: any;
  public function: number;
  public getAllFrequency: any;
  public frequency: number;
  public allNotification: any;
  public p: any;
  public notificationDeleteID: number;
  public projectTypeEdit: number;
  public projectnameEdit: number;
  public projectPhaseEdit: number;
  public projectphasemilestoneEdit: number;
  public lifecycleEdit: number;
  public functionEdit: number;
  public departmentEdit: number;
  public impectcategoryEdit: number;
  public impectlevelEdit: number;
  public frequencyEdit: number;
  public notificationEditID: number;
  public processAsObjects: number;
  public ifSelectProject: boolean = true;
  public process: number;
  public notificationType: string;
  public processEdit: number;
  public ifSelectEditProject: boolean = true;
  public notificationEditType: string;
  public isSubmitted: boolean = false;
  public user: any = JSON.parse(localStorage.getItem('currentUser'));
  public email: string = this.user.Email;
  public isSuccessAddNotification: boolean = false;
  @ViewChild('notificationModal', { static: false }) public notificationModal: ModalDirective;
  @ViewChild('deleteNotification', { static: false }) public deleteNotification: ModalDirective;
  @ViewChild('notificationEditModal', { static: false }) public notificationEditModal: ModalDirective;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.getAllNotification();
    this.getdepartments();
    this.getcategories();
    this.getimpactlevel();
    this.getProjecttype();
    this.getlifecycle();
    this.getfunctions();
    this.getFrequency();
    this.getProcess();
  }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      department: ['', Validators],
      impectlevel: ['', Validators],
      impectcategory: ['', Validators],
      process: ['', Validators],
      email: ['', Validators],
      projectType: ['', Validators],
      projectPhase: ['', Validators],
      projectphasemilestone: ['', Validators],
      projectname: ['', Validators],
      lifecycle: ['', Validators],
      function: ['', Validators],
      frequency: ['', Validators.required],

    });
    this.notificationEditForm = this.formBuilder.group({
      departmentEdit: ['', Validators],
      impectlevelEdit: ['', Validators],
      impectcategoryEdit: ['', Validators],
      processEdit: ['', Validators],
      projectTypeEdit: ['', Validators],
      projectPhaseEdit: ['', Validators],
      projectphasemilestoneEdit: ['', Validators],
      projectnameEdit: ['', Validators],
      lifecycleEdit: ['', Validators],
      functionEdit: ['', Validators],
      frequencyEdit: ['', Validators.required],

    });
    this.notificationType = "Project";
    this.department = 0;
    this.impectlevel = 0;
    this.impectcategory = 0;
    this.process = 0;
    this.projectType = 0;
    this.projectPhase = 0;
    this.projectphasemilestone = 0;
    this.projectname = 0;
    this.lifecycle = 0;
    this.function = 0;
    this.frequency = null;
    this.projectTypeEdit = 0;
    this.projectnameEdit = 0;
    this.projectPhaseEdit = 0;
    this.processEdit = 0;
    this.projectphasemilestoneEdit = 0;
  }
  refreshNotification(){
    this.notificationType = "Project";
    this.department = 0;
    this.impectlevel = 0;
    this.impectcategory = 0;
    this.process = 0;
    this.projectType = 0;
    this.projectPhase = 0;
    this.projectphasemilestone = 0;
    this.projectname = 0;
    this.lifecycle = 0;
    this.function = 0;
    //this.frequency = null;
    this.projectTypeEdit = 0;
    this.projectnameEdit = 0;
    this.projectPhaseEdit = 0;
    this.processEdit = 0;
    this.projectphasemilestoneEdit = 0;
    this.isSubmitted = false;
  }
  onselectProjecttype(e) {
    this.getMappingProjectTypeAndProject(this.projectType);
    this.getMappingProjectTypeAndPhase(this.projectType);
    this.getMappingProjectAndMilestone(this.projectType);
  }
  onselectEditProjecttype(e) {
    this.getMappingProjectTypeAndProject(this.projectTypeEdit);
    this.getMappingProjectTypeAndPhase(this.projectTypeEdit);
    this.getMappingProjectAndMilestone(this.projectTypeEdit);
  }
  getAllNotification() {
    this.userService.getAllNotification(this.user.ID).subscribe((data) => {
      if (data.status) {
        this.allNotification = data.result;
      }
    });
  }
  getdepartments() {
    this.userService.getdepartments().subscribe((data) => {
      if (data.status) {
        this.departmentAsObjects = data.result;
        //  console.log("this.departmentAsObjects+-+",this.departmentAsObjects);
      }
    });
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
      console.log(data);
      this.categoriesAsObjects = data.result;
    });
  }
  getimpactlevel() {
    this.userService.getimpactlevel().subscribe((data) => {
      console.log(data);
      this.impactlevelAsObjects = data.result;
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
  getMappingProjectTypeAndPhase(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndPhase(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.MappingProjectTypeAndPhase = data.result;

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
  getlifecycle() {
    this.userService.getlifecycle().subscribe((data) => {
      if (data.status) {
        this.lifecycleAsObjects = data.result;
      }

    });
  }
  getfunctions() {
    this.userService.getfunctions().subscribe((data) => {
      //  console.log(data);
      this.functionAsObjects = data.result;

    });
  }
  getFrequency() {
    this.userService.getFrequency().subscribe((data) => {
      if (data.status) {
        this.getAllFrequency = data.result;

      }
    });
  }
  addNotificationBtn() {
    this.notificationModal.show();
    this.isSuccessAddNotification = false;
  }
  hideNotificationModul() {
    this.notificationModal.hide();
  }
  closeSuccessPop(){
    this.isSuccessAddNotification = false; 
  }
  hideNotificationEditModul() {
    this.notificationEditModal.hide();

  }
  get notificationFormControls() { return this.notificationForm.controls; }
  notificationEdit(notifi) {
    console.log(" notifi.Phase-------", this.departmentEdit);
     this.isSuccessAddNotification = false; 
    if (notifi.ProjectTypeID) {
      this.notificationEditType = "Project";
      this.projectTypeEdit = notifi.ProjectTypeID;
      this.projectPhaseEdit = notifi.PhaseID;
      this.projectphasemilestoneEdit = notifi.MilestoneID;
      this.projectnameEdit = notifi.ProjectNameID;
      this.ifSelectEditProject = true;
    } else if (notifi.ProcessID) {
      this.notificationEditType = "Process";
      this.processEdit = notifi.ProcessID;
      this.ifSelectEditProject = false;
    } else {
      this.notificationEditType = "Project";
      this.ifSelectEditProject = true;
    }

    this.notificationEditID = notifi.ID;
    this.getMappingProjectTypeAndProject(notifi.ProjectTypeID);
    this.getMappingProjectTypeAndPhase(notifi.ProjectTypeID);
    this.getMappingProjectAndMilestone(notifi.ProjectTypeID);

    if (notifi.ImpactLevelID) {
      this.impectlevelEdit = notifi.ImpactLevelID;
    } else {
      this.impectlevelEdit = 0;
    }
    if (notifi.ImpactCategoryID) {
      this.impectcategoryEdit = notifi.ImpactCategoryID;
    } else {
      this.impectcategoryEdit = 0;
    }
    if (notifi.LifeCycleID) {
      this.lifecycleEdit = notifi.LifeCycleID;
    } else {
      this.lifecycleEdit = 0;
    }
    if (notifi.FunctionsID) {
      this.functionEdit = notifi.FunctionsID;
    } else {
      this.functionEdit = 0;
    }
    if (notifi.DepartmentID) {
      this.departmentEdit = notifi.DepartmentID;
    } else {
      this.departmentEdit = 0;
    }
    this.frequencyEdit = notifi.FrequencyID;
    this.notificationEditModal.show();
  }
  notificationDelete(ID) {
    this.notificationDeleteID = ID;
    this.deleteNotification.show();

  }
  deleteNtfClose() {
    this.deleteNotification.hide();
  }
  deleteNtfDone() {
    this.userService.deleteNotification(this.notificationDeleteID).subscribe((data) => {
      if (data.status) {
        window.location.reload();
      }
    });
  }
  notificationTypeChange(e, notificationType) {
    if (notificationType == 'Project') {
      this.process = 0;
      this.ifSelectProject = true;
    } else if (notificationType == 'Process') {
      this.projectType = 0;
      this.projectname = 0;
      this.projectPhase = 0;
      this.projectphasemilestone = 0;
      this.ifSelectProject = false;
    }
  }
  notificationEditTypeChange(e, notificationEditType) {
    if (notificationEditType == 'Project') {
      this.processEdit = 0;
      this.ifSelectEditProject = true;
    } else if (notificationEditType == 'Process') {
      this.projectTypeEdit = 0;
      this.projectnameEdit = 0;
      this.projectPhaseEdit = 0;
      this.projectphasemilestoneEdit = 0;
      this.ifSelectEditProject = false;
    }

  }
  addNotification() {
    this.isSubmitted = true;
    let obj: any = {
      UserID: this.user.ID,
      Department: this.department,
      Impectlevel: this.impectlevel,
      Process: this.process,
      Impectcategory: this.impectcategory,
      ProjectType: this.projectType,
      ProjectPhase: this.projectPhase,
      Projectphasemilestone: this.projectphasemilestone,
      Projectname: this.projectname,
      Lifecycle: this.lifecycle,
      Function: this.function,
      Frequency: this.frequency,
      IsEnabled: 1
    }
    // console.log("---------*******", this.notificationForm.valid, this.notificationForm.controls['department'].valid);
    if (this.notificationForm.valid) {
     
        console.log("++++++++++++++++++++---------------IF");
        this.userService.addNotification(obj).subscribe((data) => {
          if (data.status) {
            this.notificationModal.hide();
            this.getAllNotification();
            this.refreshNotification();
            this.isSuccessAddNotification = true;
           // window.location.reload();
          }
        });
    }
  }
  editNotification() {
    let obj: any = {
      ID: this.notificationEditID,
      Department: this.departmentEdit,
      Impectlevel: this.impectlevelEdit,
      Impectcategory: this.impectcategoryEdit,
      Process: this.processEdit,
      ProjectType: this.projectTypeEdit,
      ProjectPhase: this.projectPhaseEdit,
      Projectphasemilestone: this.projectphasemilestoneEdit,
      Projectname: this.projectnameEdit,
      Lifecycle: this.lifecycleEdit,
      Function: this.functionEdit,
      Frequency: this.frequencyEdit
    }

    this.userService.editNotification(obj).subscribe((data) => {
      if (data.status) {
        window.location.reload();
      }
    });
  }
}
