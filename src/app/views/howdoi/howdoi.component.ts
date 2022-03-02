import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-howdoi',
  templateUrl: './howdoi.component.html',
  styleUrls: ['./howdoi.component.scss']
})
export class HowdoiComponent implements OnInit {
  public hasuser = false;
  public avatarImg: string = '';
  public show: boolean = true;
  public show1: boolean = true;
  constructor(private titleService: Title) { 
    this.titleService.setTitle("Lighthouse | How Do I ?");
    this.iconhide();
    this.iconhide1();
    this.masterlistproject();
  }

  ngOnInit() {
  }
  masterlistproject() {
    localStorage.removeItem("tabforprocess");
    localStorage.removeItem("tabID");
    var projectradiobuttn = "project";
    var projecttabselection = "tab1"
    localStorage.setItem("tabforprocess", projectradiobuttn);
    localStorage.setItem("tabID", projecttabselection);


  }



  iconhide() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
    console.log('curent user', id);
    // debugger;
    if (id == 3) {
      this.show = false;
      this.hasuser = true;
    }
  }
  iconhide1() {
    const user: any = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.roleid
    console.log('curent user', id);
    // debugger;
    if (id == 2) {
      this.show1 = false;
      this.hasuser = true;
    }
  }
}
