import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewdatabaseforms',
  templateUrl: './viewdatabaseforms.component.html',
  styleUrls: ['./viewdatabaseforms.component.scss']
})

export class ViewdatabaseformsComponent implements OnInit {
  public results: any[];
  public dataFields: any[];
  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public editSettingForm: FormGroup;
  public sett_Label: string;
  public sett_Requirements: boolean;
  public dataID: number;
  public type: any;
  public lessonFieldName: any;
  public parent_field: any;
  public isLessonAdded: boolean;
  public typeofGroup: string;
  public selectValue: string;
  public showResultsForProject: boolean = false;
  public showResultsForProcess: boolean = false;
  public lessonField: string;
  public showForProcess: boolean = false;
  public showMessage: boolean = false;
  public checkbox: string;
  public p: any;
  public lessonFiedID: any;


  @ViewChild('editview', { static: false }) public EditView: ModalDirective;
  @ViewChild('deletedata', { static: false }) public deletedata: ModalDirective;
  @ViewChild('editviewforprocess', { static: false }) public EditViewforprocess: ModalDirective;


  public constructor(private titleService: Title, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.titleService.setTitle("Lighthouse | View Database Form");
    this.getAlldatabaseforms();
    this.getLesson();
    this.getAllLessonData();
  }
  ngOnInit(): void {
    this.editSettingForm = this.formBuilder.group({
      sett_Label: ['', Validators.required],
      type: ['', Validators.required],
      sett_Requirements: ['', Validators.required],
      parent_field: ['', Validators],
      typeofGroup: ['', Validators.required],
      selectValue: ['', Validators.required],
    });
    this.lessonField = 'Project';
  }

  getAlldatabaseforms() {
    this.userService.getAlldatabaseforms(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
      }
    });
  }

  tableDataSettings(tabledata) {
    this.lessonFiedID = tabledata._id;
    this.sett_Label = tabledata.Label;
    this.sett_Requirements = tabledata.Required;
    this.type = tabledata.Type;
    this.checkbox = tabledata.Checkbox;
    this.lessonFieldName = tabledata.Name;
    if (tabledata.ParentLessonField) {
      this.parent_field = tabledata.ParentLessonField;
    } else {
      this.parent_field = null;
    }
    if (tabledata.Section) {
      this.typeofGroup = tabledata.Section;
    } else {
      this.typeofGroup = null;
    }
    console.log("++++++++++++++++++++++++++888888888+++++++++++++++++++", this.type);

    this.getAllAutocompleteField(this.lessonFiedID, this.user.Org._id);
    if (this.showResultsForProcess == false) {
      this.EditView.show();
    } else {
      this.EditViewforprocess.show();

    }
  }


  getAllAutocompleteField(lfId, orgId) {
    this.userService.getAllAutocompleteField(lfId, orgId).subscribe((data) => {
      if (data.status) {
        this.dataFields = data.result;
      }
    });
  }

  filterItemsOfType(lessonField) {
    // console.log("++++++++++++++++filterItemsOfType++++++++++++++++",this.lessonField);
    if (!this.dataFields) {
      return this.dataFields;
    }
    return this.dataFields.filter(x => x.Typeoflesson == lessonField);
  }
  getLesson() {
    this.userService.getAllLesson(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        this.isLessonAdded = true;
      } else {
        this.isLessonAdded = false;
      }
    });
  }
  tabledataDelete(tabledataID) {
    this.dataID = tabledataID;
    this.deletedata.show();
  }
  deleteClose() {
    this.deletedata.hide();
  }
  deleteDone() {
    this.userService.deleteViewDatabase(this.dataID).subscribe((data) => {
      window.location.reload();
    });
  }
  editSetting() {
    console.log("++++++editSetting++++++", this.sett_Requirements)
    let obj: any = {
      LessonFiedID: this.lessonFiedID,
      UserID: this.user._id,
      Label: this.sett_Label,
      Required: this.sett_Requirements,
      Parent: this.parent_field,
      Checkbox: this.checkbox,
      Section: this.typeofGroup,
      Name: this.lessonFieldName
    };
    this.userService.updateViewDatabaseForm(obj).subscribe((data) => {
      if (data.status) {
        this.EditView.hide();
        this.getAllLessonData();
      }
    });
    if (this.isLessonAdded) {
      this.userService.updateLessondatasLabel(obj).subscribe((data) => {
        if (data.status) {
          this.EditView.hide();
          this.getAllLessonData();
        }
      });
    }
  }
  checkboxForRecordLesson(tabledata, activeCheckbox) {
    this.checkbox = activeCheckbox.defaultValue;
    console.log(this.checkbox, activeCheckbox);
    let obj: any = {
      LessonFiedID: tabledata._id,
      Name: tabledata.Name,
      Checkbox: activeCheckbox.defaultValue,
    };
    this.userService.updateCheckboxLessonField(obj).subscribe((data) => {
      if (data.status) {
        this.getAllLessonData();
        // if(this.showforpro == false){
        //   this.getalllessondata();
        // }
      }
    });
    if (this.isLessonAdded) {
      this.userService.updateLessonDatas(obj).subscribe((data) => {
        // if (data.status) {
        //   this.getalllessondata();
        // }
      });
    }
  }
  removeMessage(){
    this.showMessage = false;
  }
  toggleLessonFlow(lessonField) {

    this.lessonField = lessonField;
    if (lessonField == 'Project') {
      this.userService.getAllDatabaseFormForProject(this.user.Org._id).subscribe((data) => {
        if (data.status) {
          this.results = data.result;
          this.showResultsForProject = true;
          this.showResultsForProcess = false;
        }
      });
    } else if (lessonField == 'Process') {
      this.userService.getAllDatabaseFormForProcess(this.user.Org._id).subscribe((data) => {
        if (data.status) {
          this.results = data.result;
          this.showResultsForProcess = true;
          this.showResultsForProject = false;
          if (data.result.length > 0) {
            this.showForProcess = true;
          }
        }
      });
    }
  }

  getAllLessonData() {
    this.userService.getAllDatabaseFormForProject(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.showResultsForProject = true;
        this.showResultsForProcess = false;
        console.log(this.results);
      }
    });

    this.userService.getAllDatabaseFormForProcess(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        if (data.result.length > 0) {
          this.showForProcess = true;
        }
      }
    });

  }
}