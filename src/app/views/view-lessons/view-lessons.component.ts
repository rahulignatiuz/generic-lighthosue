import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-view-lessons',
  templateUrl: './view-lessons.component.html',
  styleUrls: ['./view-lessons.component.scss']
})
export class ViewLessonsComponent implements OnInit {
  public user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public results: any;
  public show: boolean = true;
  public showMainCard: boolean = false;
  public showMainCardCollection: boolean;
  public searchedKeyword: any;
  public selectLessonType: number;
  public filters: any;
  public selecedData: any;
  public selecedParentData: Object = {};
  public teller :any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getLesson();
    this.getAllAutocomplete();
    this.getElement();
  }
  getLesson() {
    this.userService.getAllLesson(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        //   console.log("++++++++getAllLesson+++++++++", data.result);
        this.results = data.result;
        for (let i = 0; i < data.result[0].length; i++) {
          this.showMainCardCollection = data.result[0][i].Checkbox;
          if (this.showMainCardCollection == true) {
            this.showMainCard = true;
          }
        }
      }
    });
  }
  editLesson(lessonId) {
    this.router.navigate(['/update-lesson-project/' + lessonId]);
    // console.log("++++++++getLessonId+++++++++", lessonId);
  }
  togglelessonFlow(e) {

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
  onSelectFilters(event, fieldID) {
     console.log("+++++changeParent+++++event++++++++++", event);
     console.log("+++++changeParent+++++fieldID++++++++++", fieldID);
    if (event._id) { event = event._id }
  //  console.log("+++++changeParent+++++event++++++++++", event);
    this.userService.getAllAutocompleteParentField(event).subscribe((data) => {
      if (data.status) {
        this.selecedParentData[fieldID] = data.result;
      }
    });
    console.log("+++++changeParent+++++fieldID++++teller++++++", this.teller);
  }
  // trackByIndex(index: number, obj: any): any {
  //   console.log("+++++trackByIndex+++++++++++++++", index, obj);
  //   return index;
  // }
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
  getAllAutocomplete() {
    // console.log("++++++++++++++++input+data+++++++++++++++++++", this.user.Org._id);
    this.userService.getallautocompleteforproject(this.user.Org._id).subscribe((data) => {
      if (data.status) {
        this.filters = data.result;
      }
    });
  }
}
