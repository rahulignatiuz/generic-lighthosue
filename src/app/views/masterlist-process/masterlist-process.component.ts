import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { TagInputModule } from 'ngx-chips';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
//import { MatTabChangeEvent } from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-masterlist-process',
  templateUrl: './masterlist-process.component.html',
  styleUrls: ['./masterlist-process.component.scss']
})

export class MasterlistProcessComponent implements OnInit {
  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public results: any;
  public masterData: FormGroup;
  public isDataShown: boolean = true;
  public isSubmitted: boolean = false;
  public name: String;
  public selectTypeId: any;
  public selecedData: any;
  public selecedParentData: any;
  public parentFieldLabel: String;
  public parent_field: any;
  public currentLessonField: any;
  public editMasterlistForm: FormGroup;
  public EditmasterlistName: string;
  public masterlistlabelid: string;
  public selecedTabId: string;
  public showresultsforproject: boolean = false;
  public showresultsforprocess: boolean = false;
  public lessonfield: string;
  public showforpro: boolean = false;
  @ViewChild('masterlisteditview', { static: false }) public masterlistedit: ModalDirective;
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("Lighthouse | Master List");
  }
  ngOnInit() {
    this.masterData = this.formBuilder.group({
      parent_field: [null, Validators],
      name: ['', Validators.required],
    });
    this.editMasterlistForm = this.formBuilder.group({
      EditmasterlistName: ['', Validators.required],
    });
   // this.getAllAutocomplete();
    this.lessonfield = 'Process';
    this.getAllAutocompleteforprocess();
    
  }
  // getAllAutocomplete() {
  //   // console.log("++++++++++++++++input+data+++++++++++++++++++", this.user.Org._id);
  //   this.userService.getAllAutocomplete(this.user.Org._id).subscribe((data) => {
  //     if (data.status) {
  //        console.log("++++++++++++++++input+data+++++++++++++++++++", data);
  //       this.results = data.result;
  //     }
  //   });
  // }
  getAllAutocomplete() {
    
    // console.log("++++++++++++++++input+data+++++++++++++++++++", this.user.Org._id);
    // this.userService.getallautocompleteforproject(this.user.Org._id).subscribe((data) => {
    //   if (data.status) {
    //     this.results = data.result;
    //     console.log('-----------------------------------------------',data)
    //   }
    // });
  }
  getAllAutocompleteforprocess() {
    this.userService.getallautocompleteforprocess(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
      }

      if (data.result.length > 0) {
        this.showforpro = true;
      }
    });
  }
  togglelessonFlow(lessonfield) {
    debugger
    if (lessonfield == 'Project') {
    
      // this.userService.getallautocompleteforproject(this.user.Org._id).subscribe((data) => {
      //   if (data.status) {
      //     this.results = data.result;
      //     console.log('-----------------------------------------------',data)
      //     this.showresultsforproject = true;
      //     this.showresultsforprocess = false;
      //   }
    
      // });
      // this.getAllAutocompleteData(this.selecedTabId);
      this.router.navigate(['/masterlists']);
    }  if (lessonfield == 'Process') {
      this.userService.getallautocompleteforprocess(this.user.Org._id).subscribe((data) => {
        if (data.status) {
          this.results = data.result;
          this.showresultsforproject = false;
          this.showresultsforprocess = true;
        }
       
      });
      this.userService.getAllAutocompleteDataforprocess(this.selecedTabId).subscribe((data) => {
        if (data.status) {
          
          this.selecedData = data.result;
        }
      });
    }
  }
  getAllAutocompleteData(selecedTabId) {
    // console.log('tabChangeEvent =====> ', selecedTabId);
    this.selecedTabId = selecedTabId;
    this.userService.getAllAutocompleteData(selecedTabId).subscribe((data) => {
      if (data.status) {
        
        this.selecedData = data.result;
      }
    });
  }
  getParentAutocompleteById(selecedTabId) {
    this.userService.getParentAutocompleteById(selecedTabId).subscribe((data) => {
      if (data.status) {
       // console.log("+++++++++++++++field+++++++++++++++++++", data.result);
        this.parentFieldLabel = data.result.Label;
        this.getAllAutocompleteParentData(data.result._id)
      } else {
        this.parentFieldLabel = null;
      }
    });
  }
  getAllAutocompleteParentData(selecedTabId) {
    // console.log('tabChangeEvent =====> ', selecedTabId);
    this.userService.getAllAutocompleteParentData(selecedTabId).subscribe((data) => {
      if (data.status) {
        this.selecedParentData = data.result;
      }
    });
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.isDataShown = true;
    this.currentLessonField = tabChangeEvent.tab.textLabel;
    this.getAllAutocompleteData(tabChangeEvent.tab.textLabel);
    this.getParentAutocompleteById(tabChangeEvent.tab.textLabel);
  }

  get masterDataControls() { return this.masterData.controls; }

  onChangeParentField(e) {
   // console.log("+++++++onChangeParentField++++++++++", e.target.value);
    if (e.target.value == 'all') {
      this.getAllAutocompleteData(this.currentLessonField);
    } else {
      this.userService.getAllAutocompleteParentDataAndField(e.target.value, this.currentLessonField).subscribe((data) => {
        if (data.status) {
          this.selecedData = data.result;
        }
      });
    }

  }

  showAddMasterData(stId) {
    this.selectTypeId = stId;
    this.parent_field = null;
    // this.isDisplayed = true;
    this.isDataShown = false;
  }

  addMasterData() {
    this.isSubmitted = true;
    let obj: any = {
      UserID: this.user._id,
      ParentField: this.parent_field,
      Name: this.name,
      SelectType: this.selectTypeId,
      Typeoflesson: this.lessonfield,
      Active: true
    };
    this.userService.addAutocomplete(obj).subscribe((data) => {
      if (data.status) {
        this.isDataShown = true;
        this.isSubmitted = false;
        this.masterData.reset();
        this.getAllAutocompleteData(this.selectTypeId);
        // console.log("++++++++++++++++input+data+++++++++++++++++++", data);
      }
    });
  }
  masterlisteditdata(id, Name) {
    this.masterlistlabelid = id;
    this.EditmasterlistName = Name;
    this.masterlistedit.show();
  }
  updatemasterlistlabels() {
    let obj: any = {
      _id: this.masterlistlabelid,
      Name: this.EditmasterlistName,
      Parent: this.parent_field,
    };
    this.userService.updatemasterlistlabel(obj).subscribe((data) => {
      if (data.status) {
        this.masterlistedit.hide();
        this.getAllAutocompleteData(this.selecedTabId);
      }
    });
  }
}