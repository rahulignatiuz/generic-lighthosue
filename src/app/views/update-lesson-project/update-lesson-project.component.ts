import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-update-lesson-project',
  templateUrl: './update-lesson-project.component.html',
  styleUrls: ['./update-lesson-project.component.scss']
})
export class UpdateLessonProjectComponent implements OnInit {
  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public editLessonForm: FormGroup;
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
  public lessonTab: boolean = false;
  public additionalTab: boolean = false;
  public projectTab: boolean = true;
  public projectdTab: boolean = false;
  public lessondTab: boolean = true;
  public additionaldTab: boolean = true;
  public element: any;
  public isSubmitted: boolean = false;
  public projectLessonId: any;

  @ViewChild('myModal', { static: false }) public myModal: ModalDirective;
  @ViewChild('validatedModal', { static: false }) public validatedModal: ModalDirective;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.editLessonForm = this.formBuilder.group({
      autocomplete: this.formBuilder.group({}),
      input_autocomplete: this.formBuilder.group({}),
      text: this.formBuilder.group({}),
      textarea: this.formBuilder.group({}),
      files: this.formBuilder.group({}),
    });
    this.route.params.subscribe(routeParams => {
      // console.log('routeParams 1', routeParams);
      if (routeParams && routeParams.id) {
        const rid = routeParams.id;
        this.projectLessonId = rid;

        if (this.projectLessonId) {
          console.log("++++++++++++++++this.projectLessonId++++++++++++++++++", this.projectLessonId);
          setTimeout(() => {
            this.getLessonProjectByID(this.projectLessonId);
          }, 1000);
        }
      }
    });
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
        }

        this.results = data.result;
        this.getElement();
      }
    });
  }
  autocompleteFormControl(field) {
    if (field.Required) {
      (this.editLessonForm.get("autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.editLessonForm.get("autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  textFormControl(field) {
    if (field.Required) {
      (this.editLessonForm.get("text") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.editLessonForm.get("text") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  textareaFormControl(field) {
    if (field.Required) {
      (this.editLessonForm.get("textarea") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.editLessonForm.get("textarea") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  fileFormControl(field) {
    if (field.Required) {
      (this.editLessonForm.get("files") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.editLessonForm.get("files") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  input_autocompleteFormControl(field) {
    if (field.Required) {
      (this.editLessonForm.get("input_autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl('', Validators.required)
      );
    } else {
      (this.editLessonForm.get("input_autocomplete") as FormGroup).addControl(
        field.Name,
        new FormControl()
      );
    }

  }
  getElement() {
    //  console.log("+++++++++this.parentIds+++++++++++", this.parentIds);
    this.userService.getAllAutocompleteAllData().subscribe((data) => {
      if (data.status) {
        //   console.log("++++++++++data.result++++++++++", data.result);
        this.selecedData = data.result;
      }
    });
  }
  get editLessonFormControls() { return this.editLessonForm.controls; }
  getValidation(formGroup, fieldsName) {
    return this.editLessonForm.get(formGroup + "." + fieldsName);
  }
  getLessonProjectByID(lessonID) {
    this.userService.getlessonbyID(lessonID).subscribe((data) => {
      if (data.status) {
        data.result.forEach(element => {
          console.log("++++++++++++++++getLessonProjectByID+++++Autocomplete+++++++++++++", element);
          if (element.Autocomplete) {
            this.changeParent(element.Autocomplete, element.LessonField);
            this.editLessonForm.get(element.Type + "." + element.Name).setValue(element.Autocomplete);
            //  console.log("++++++++++++++++getLessonProjectByID+++++Autocomplete+++++++++++++", element);
          } else if (!element.AttachmentUrl) {
            this.editLessonForm.get(element.Type + "." + element.Name).setValue(element.Value);
            //  console.log("++++++++++++++++getLessonProjectByID+++++++Value+++++++++++", element);
          }
        });
      }
    });
  }
  filterItemsOfType(type) {
    if (!this.selecedData) {
      return this.selecedData;
    }
    return this.selecedData.filter(x => x.LessonField == type);
  }
  filterSubElement(field) {
    if (!this.selecedParentData[field.ParentLessonField]) {
      return this.selecedParentData[field.ParentLessonField];
    }
    return this.selecedParentData[field.ParentLessonField].filter(x => x.LessonField == field._id);
  }
  changeParent(event, fieldID) {
    if (event._id) { event = event._id }
    this.userService.getAllAutocompleteParentField(event).subscribe((data) => {
      if (data.status) {
        this.element = data.result;
        this.selecedParentData[fieldID] = data.result;
      }
    });
  }
  reloadaction() {
    window.location.reload();
  }
  close() {
    this.validatedModal.hide();
  }
  editLesson(data) {
    console.log("++++++++++++++++++++data++++++++++++", data);
    this.isSubmitted = true;
    let obj: any = {
      UserID: this.user._id,
      LessonId: this.projectLessonId,
      Autocomplete: data.value.autocomplete,
      Text: data.value.text,
      Textarea: data.value.textarea,
      Input_autocomplete: data.value.input_autocomplete
    };
    console.log("this.isValidated+++++++", this.editLessonForm.valid);
    //   if (this.editLessonForm.valid) {
    this.userService.updateLesson(obj).subscribe((data) => {
      if (data.status) {
        //console.log("++++++++++++++++++addLesson++++++this.attachmentFiles+++++++file++attachmentFiles+++++++++", this.attachmentFiles);
        // if (this.attachmentFiles.length) {
        //   this.attachmentFiles.forEach((value, index) => {
        //     //   console.log("++++++++++++++++++addLesson+++++++++++++file++attachmentFiles+++++++++", value);
        //     const formData = new FormData();
        //     formData.append('Name', value.Name);
        //     formData.append('Attachment', value.File);
        //     formData.append('LessonID', data.result._id);
        //     // console.log("++++++++++++++++++addLesson+++++++++++++file++attachmentFiles+++++++++", data.result._id);
        //     this.userService.saveAttachment(formData).subscribe((data) => {
        //       if (data.status) {
        //         if (index == this.attachmentFiles.length - 1) {
        //           this.attachmentFiles = [];
        //           this.myModal.show();
        //         }
        //       }
        //     });
        //   });
        // } else {
        //   this.myModal.show();
        // }
        this.myModal.show();
      }
    });
    //  } else {
    //    this.validatedModal.show();
    //   }

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
