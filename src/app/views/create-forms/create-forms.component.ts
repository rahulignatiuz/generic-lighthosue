import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { field, value } from './global.model';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../_services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-forms',
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.scss']
})
export class CreateFormsComponent implements OnInit {
  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  value: value = {
    label: "",
    value: ""
  };
  success = false;
  public show: boolean = false;
  public alreadychanged: boolean = false;
  public newplaceholdervalue: any;
  @ViewChild('projectprocessdata', { static: false }) public projectprocessdata: ModalDirective;
  @ViewChild('removetitle', { static: false }) public removetitle: ElementRef;

  fieldModels: Array<field> = [
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex": "",
      "handle": true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex": "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle": true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex": "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle": true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon": "fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "datetime_local",
      "icon": "fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon": "fa-text-width",
      "label": "Textarea"
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph",
      "placeholder": "Type your text to display here only"
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon": "fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon": "fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon": "fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "input_autocomplete",
      "icon": "fa-bars",
      "label": "Input Select",
      "description": "Input Select",
      "placeholder": "Add a new tag",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon": "fa-file",
      "label": "File Upload",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button",
      "icon": "fa-paper-plane",
      "subtype": "submit",
      "label": "Submit"
    }
  ];

  modelFields: Array<field> = [];
  model: any = {
    name: 'App name...',
    description: 'App Description...',
    theme: {
      bgColor: "ffffff",
      textColor: "555555",
      bannerImage: ""
    },
    attributes: this.modelFields
  };
  report = false;
  reports: any = [];

  constructor(private route: ActivatedRoute, private titleService: Title, private userService: UserService) {
    this.titleService.setTitle("Lighthouse | Custom Form");
  }

  ngOnInit() {
    //  console.log("++++++++user++++++++++",this.user.Org._id);

    // this.route.params.subscribe( params =>{
    //   console.log(params);
    //   this.us.getDataApi('/admin/getFormById',{id:params.id}).subscribe(r=>{
    //     console.log(r);
    //     this.model = r['data'];
    //   });
    // });


    // this.model = this.cs.data; 
    // console.log(this.model.data);

  }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  removeField(i) {
    this.model.attributes.splice(i, 1);
  }

  updateForm() {
    // let obj: any = {
    //   OrgID: this.user.Org._id,
    //   UserID: this.user._id,
    //   Attributes: this.model.attributes,
    //   Active: true,
    //   Typeoflesson:"Project",
    //   Checkbox : 0
    // };
    // //  console.log("++++++++++++++++input++++++++++++++++++++", this.model.attributes);
    // this.userService.customFormLessonFieldModel(obj).subscribe((data) => {
    //   // console.log("++++++++++++++++input+data+++++++++++++++++++", data);
    //   if (data.status) {
    //     this.show = true;
    //     this.model = "";
    //   }

    // });
    if (this.model.attributes.length > 0) {
      this.projectprocessdata.show();
    }
  }

  submitforproject() {
    let input = new FormData();
    if (this.model.attributes[0].label && this.alreadychanged == false) {
      this.model.attributes[0].placeholder = this.model.attributes[0].label;
    }
    input.append('attributes', JSON.stringify(this.model.attributes));

    let obj: any = {
      OrgID: this.user.Org._id,
      UserID: this.user._id,
      Attributes: this.model.attributes,
      Active: true,
      Typeoflesson: "Project",
      Section: "projectdetails",
    };
  //  console.log("++++++++++++++++input++++++++++++++++++++", this.model.attributes);
    this.userService.customFormLessonFieldModel(obj).subscribe((data) => {
    //  console.log("++++++++++++++++input+data+++++++++++++++++++", data);
      if (data.status) {
        this.projectprocessdata.hide();
        this.show = true;
        this.model = "";
      }
    });
  }
  removemodel(e){
    // console.log(e)
    // console.log(this.removetitle.nativeElement)
    if(this.model.attributes[0].label){
      this.alreadychanged = true;
      this.model.attributes[0].placeholder  = this.model.attributes[0].placeholder;
    }
  }
  submitforprocess() {
    let input = new FormData();
    if (this.model.attributes[0].label) {
      this.model.attributes[0].placeholder = this.model.attributes[0].label;
    }
    input.append('attributes', JSON.stringify(this.model.attributes));
    let obj: any = {
      OrgID: this.user.Org._id,
      UserID: this.user._id,
      Attributes: this.model.attributes,
      Active: true,
      Typeoflesson: "Process",
      Section: "processdetails",
    };
    //  console.log("++++++++++++++++input++++++++++++++++++++", this.model.attributes);
    this.userService.customFormLessonFieldModel(obj).subscribe((data) => {
      //   console.log("++++++++++++++++input+data+++++++++++++++++++", data);
      if (data.status) {
        this.projectprocessdata.hide();
        this.show = true;
        this.model = "";
      }
    });
  }

  initReport() {
    this.report = true;
    let input = {
      id: this.model._id
    }
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }
}
