import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../_services/user.service';
import { Router } from  '@angular/router';
import {Constant} from '../../../_global/constant';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  results:any[];
  public _baseURL : string;

  public projectsAsObjects:any;
  public projectsPhaseAsObjects:any;
  public projectsPhaseMilestoneAsObjects:any;
  public categoriesAsObjects:any;
  public keywordsAsObjects:any;

  public impectlevel:string    = "";
  public impectcategory:string = "";
  public Keywords:string       = "";
  public milestone:string      = "";
  public projectPhase:string   = "";
  public _projectPhase:string = "";
  public projectName:string    = "";
  public departments:string     = "";
  
  public noResult:boolean = false;

constructor(private router: Router,private userService:UserService) { 
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

      this._baseURL = Constant.baseURL;
      this.getUserLessonsByFilter();
      this.getProjects();    
      this.getcategories();
      this.getKeywords();
  }

  ngOnInit() {
  }

  getProjects() {
         this.userService.getProjects().subscribe((data) => {
          if(data.status) {             
            this.projectsAsObjects = data.result;
          }
    });
 }
 
 getcategories() {
  this.userService.getcategories().subscribe((data) => {
   if(data.status) {             
     this.categoriesAsObjects = data.result;
   }
});
}

getKeywords() {
  this.userService.getKeywords().subscribe((data) => {
   if(data.status) {             
     this.keywordsAsObjects = data.result;
   }
});
}
 public onselectProject(tag) {
  //const confirm = window.confirm('Do you really want to add this tag?');      
  this.getProjectPhase();  
  this.getUserLessonsByFilter();
}

// public getProjectPhase(id) {
//   let projId = id ? id : 0;
//   this.userService.getProjectPhase(projId).subscribe((data) => {
//       if(data.status) {                      
//         this.projectsPhaseAsObjects = data.result;
//       }
//    });
// }

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
  this.projectPhase = (selectElementText == "All Phase" ? "" : selectElementText); 

  this.getProjectPhaseMilestone(event.target.value);  
  this.getUserLessonsByFilter();
}

public getProjectPhaseMilestone(id) {
  let phaseId = id ? id : 0;
  this.userService.getProjectPhaseMilestone(phaseId).subscribe((data) => {
      if(data.status) {                         
        this.projectsPhaseMilestoneAsObjects = data.result;
      }
   });
} 

  getUserLessonsByFilter() {
    let _projectName :any = this.projectName[0];
    let obj :object = {
      projectName: _projectName ? _projectName.projectName : "",
      phase: this.projectPhase ? this.projectPhase : "",
      milestone: this.milestone ? this.milestone : "",
      category: this.impectcategory ? this.impectcategory : "",
      keywords: this.Keywords ? this.Keywords : "",
      level: this.impectlevel ? this.impectlevel : "",
      departments: this.departments ? this.departments : ""
    };
    
    //console.log(this.impectlevel,this.impectcategory,this.Keywords,this.milestone,this.projectPhase,this.projectName);
    this.userService.getFilterLessons(obj).subscribe((data) => {
       if(data.status) {                
          this.noResult = false;       
          this.results = data.result;          
       } else {
        this.noResult = true;
        this.results = [];
       }
    });  
  }

  resetFilter() {
    this.projectPhase = '';
    this.projectName ='';    
    this._projectPhase = '';
    this.milestone = '';
    this.impectcategory = '';
    this.Keywords = '';
    this.impectlevel = '';
    this.departments ='';
    this.getUserLessonsByFilter();
  }
  

}
