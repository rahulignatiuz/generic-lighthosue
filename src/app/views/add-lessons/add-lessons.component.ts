import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-lessons',
  templateUrl: './add-lessons.component.html',
  styleUrls: ['./add-lessons.component.scss']
})
export class AddLessonsComponent implements OnInit {

  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public lessonForm: FormGroup;
  public results: any;
  public selecedData: any;
  public bydefaultselected: string;
  public title: any;
  public autocomplete: any;
  public input_autocomplete: any;
  public text: any;
  public selecedParentData: Object = {};
  // public parentIds: String[] = [];
  public attachmentFiles: any[] = [];
  public files: any;
  public lessonfield: string;
  public showHeader: boolean = false;
  public lessonTab: boolean = false;
  public additionalTab: boolean = false;
  public projectTab: boolean = true;
  public projectdTab: boolean = false;
  public lessondTab: boolean = true;
  public additionaldTab: boolean = true;
  public isSubmitted: boolean = false;

  // public parentIds: String[] = [];
  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('validatedModal', { static: false }) public validatedModal: ModalDirective;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    //  this.router.navigate(['/add-lessons-process']);
    this.lessonForm = this.formBuilder.group({
      autocomplete: this.formBuilder.group({}),
      input_autocomplete: this.formBuilder.group({}),
      text: this.formBuilder.group({}),
      textarea: this.formBuilder.group({}),
      files: this.formBuilder.group({}),
    });

    this.lessonfield = 'Project';
    this.getField();

  }

  getField() {
    this.userService.getAllDatabaseFormForProject(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        for (let field of data.result) {
          if (field.Type == 'autocomplete') {
            this.autocompleteFormControl(field);
          } else if (field.Type == 'text') {
            this.textFormControl(field);
          } else if (field.Type == 'textarea') {
            this.textareaFormControl(field);
          } else if (field.Type == 'file') {
            this.fileFormControl(field);
          } else if (field.Type == 'input_autocomplete') {
            this.input_autocompleteFormControl(field);
          }
          this.bydefaultselected = field.Name;
          this.bydefaultselected = "";

        }
        if (data.result.length > 0) {
          // this.showHeader = true;
          this.getProcessFields(true);
        } else {
          this.getProcessFields(false);
        }
        this.results = data.result;
        this.getElement();
      } else {
        this.getProcessFields(false);
      }
    });
  }
  autocompleteFormControl(field) {
    if (field.Required) {
      (this.lessonForm.get("autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.lessonForm.get("autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  textFormControl(field) {
    if (field.Required) {
      (this.lessonForm.get("text") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.lessonForm.get("text") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  textareaFormControl(field) {
    if (field.Required) {
      (this.lessonForm.get("textarea") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.lessonForm.get("textarea") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  fileFormControl(field) {
    if (field.Required) {
      (this.lessonForm.get("files") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.lessonForm.get("files") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  input_autocompleteFormControl(field) {
    if (field.Required) {
      (this.lessonForm.get("input_autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.lessonForm.get("input_autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  get lessonFormControls() { return this.lessonForm.controls; }
  getValidation(formGroup, fieldsName) {
    return this.lessonForm.get(formGroup + "." + fieldsName);
  }
  getProcessFields(isProjectExists) {
    console.log("++++++++++++++data.result.length++++++++++++++++++++++", isProjectExists);
    this.userService.getAllDatabaseFormForProcess(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        if (data.result.length > 0) {
          if (isProjectExists) {
            this.showHeader = true;
          } else {
            this.router.navigate(['/add-lessons-process']);
          }
        } else {
          this.showHeader = false;
        }
      } else {
        this.showHeader = false;
      }
    });
  }
  getElement() {
    //  console.log("+++++++++this.parentIds+++++++++++", this.parentIds);
    this.userService.getAllAutocompleteAllData().subscribe((data) => {
      if (data.status) {
        console.log("++++++++++getElement++++++++++", data.result);
        this.selecedData = data.result;
      }
    });
  }

  changeParent(event, fieldID) {
    //  console.log("+++++changeParent+++++fieldID++++++++++", fieldID);
    if (event._id) { event = event._id }
    //  console.log("+++++changeParent+++++event++++++++++", event);
    this.userService.getAllAutocompleteParentField(event).subscribe((data) => {
      if (data.status) {
        this.selecedParentData[fieldID] = data.result;
      }
    });
  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if (this.attachmentFiles.length) {
        this.attachmentFiles.forEach((value, index) => {
          if (value.Name == event.target.getAttribute("ng-reflect-name")) {
            this.attachmentFiles.splice(index, 1);
          }
          this.attachmentFiles.push({ File: file, Name: event.target.getAttribute("ng-reflect-name") });
        });
      } else {
        this.attachmentFiles.push({ File: file, Name: event.target.getAttribute("ng-reflect-name") });
      }
    }
  }
  filterItemsOfType(type) {
    if (!this.selecedData) {
      return this.selecedData;
    }
    // console.log("+++++++++++++++this.selecedData++++++++++++++++",this.selecedData);
    return this.selecedData.filter(x => x.LessonField == type);
  }
  filterSubElement(field) {
    if (!this.selecedParentData[field.ParentLessonField]) {
      return this.selecedParentData[field.ParentLessonField];
    }
    return this.selecedParentData[field.ParentLessonField].filter(x => x.LessonField == field._id);
  }
  // resetForm() {
  //   this.myModal.hide();
  //   this.lessonForm.reset();
  // }
  reloadaction() {
    window.location.reload();
  }
  close() {
    this.validatedModal.hide();
  }

  addLesson(data) {
    this.isSubmitted = true;
   // console.log("++++++++++++++++++addLesson++++++this.attachmentFiles+++++++file++attachmentFiles+++++++++", data.value.autocomplete);
  //  console.log("++++++++++++++++++addLesson++++++this.attachmentFiles+++++++file++attachmentFiles+++++++++", data.value.input_autocomplete);
    let obj: any = {
      UserID: this.user._id,
      OrgID: this.user.Org._id,
      Autocomplete: data.value.autocomplete,
      Text: data.value.text,
      Textarea: data.value.textarea,
      Input_autocomplete: data.value.input_autocomplete,
      Typeoflesson: this.lessonfield,
      Active: true
    };
    console.log("this.isValidated", this.lessonForm.valid);

    if (this.lessonForm.valid) {
      this.userService.saveLesson(obj).subscribe((data) => {
        if (data.status) {
          //console.log("++++++++++++++++++addLesson++++++this.attachmentFiles+++++++file++attachmentFiles+++++++++", this.attachmentFiles);
          if (this.attachmentFiles.length) {
            this.attachmentFiles.forEach((value, index) => {
              //   console.log("++++++++++++++++++addLesson+++++++++++++file++attachmentFiles+++++++++", value);
              const formData = new FormData();
              formData.append('Name', value.Name);
              formData.append('Attachment', value.File);
              formData.append('LessonID', data.result._id);
              // console.log("++++++++++++++++++addLesson+++++++++++++file++attachmentFiles+++++++++", data.result._id);
              this.userService.saveAttachment(formData).subscribe((data) => {
                if (data.status) {
                  if (index == this.attachmentFiles.length - 1) {
                    this.attachmentFiles = [];
                    this.myModal.show();
                  }
                }
              });
            });
          } else {
            this.myModal.show();
          }
        }
      });
    } else {
      this.validatedModal.show();
    }
  }

  togglelessonFlow(lessonfield) {
    if (lessonfield == 'Project') {
      this.router.navigate(['/add-lesson']);
    } else if (lessonfield == 'Process') {
      this.router.navigate(['/add-lessons-process']);
    }
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
}
