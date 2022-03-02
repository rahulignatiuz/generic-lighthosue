import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserService } from '../../_services/user.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TimeoutError } from 'rxjs';

@Component({
  templateUrl: 'user-management.component.html',
  styleUrls: ['./user-management.component.scss']

})
export class UserManagementComponent implements OnInit {
  public results: any[];
  private _user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public avatarImg: string = '';
  public userRegistrationForm: FormGroup;
  public accountSettingForm: FormGroup;
  public roles: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public isSubmitted: boolean = false;
  public isSettingSubmitted: boolean = false;
  public isValidated: boolean = false;
  public settingUserFirstName: string;
  public sett_firstName: string;
  public sett_lastName: string;
  public sett_email: string;
  public settingUserID: number;
  public settRoles: number;
  public status: boolean;
  public p: any;
  public p1: number[] = [];
  public getAllPenUser: any[];
  public editData: any;
  public noDataPendingUser: boolean = false;
  public pendingUserCount: number = 0;
  public approveBtnDis = false;
  public createAccBtnDis = false;
  public isPendingUser: boolean = false;
  public requestEmail: string;
  public searchedUser: any;
  public showLoader: boolean = false;
  public userRole: number = this._user.Roles[0].Roleid;
  public isAscendingName: boolean = true
  public orderName: string;
  public isAscendingDate: boolean = true;
  public orderDate: string;
  public isAscendingRole: boolean = true;
  public orderRole: string;
  public isAscendingStatus: boolean = true;
  public orderStatus: string;
  public isAscendingURE: boolean = true;
  public orderURE: string;

  @ViewChild('registrationForm', { static: false }) public registrationForm: ModalDirective;
  @ViewChild('accountSetting', { static: false }) public accountSetting: ModalDirective;
  @ViewChild('deleteAccount', { static: false }) public deleteAccount: ModalDirective;
  @ViewChild('userExists', { static: false }) public userExists: ModalDirective;

  public constructor(private titleService: Title, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.titleService.setTitle("Lighthouse | User Management");
    this.getAllUser();

    this.router.routerState.root.queryParams.subscribe(params => {
      this.requestEmail = params['request-email'];
      if (this.requestEmail) {
        console.log("requestEmail----*-*", this.requestEmail);
      }
    });
    // this.userService.getGoogleUser(this._user.Email).subscribe((data) => {
    //   if (data.status)
    //     this.avatarImg = data.result[0].Picture;
    // });

  }
  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators],
      email: ['', Validators.required],
      roles: ['', Validators.required]
    });

    this.accountSettingForm = this.formBuilder.group({
      sett_firstName: ['', Validators.required],
      sett_lastName: ['', Validators],
      sett_email: ['', Validators],
      settRoles: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.roles = null;
    this.masterlistproject();
  }

  hideloader() {
    document.getElementById('loading').style.display = 'none';
  }
  getAllUser() {
    console.log("+++++++getAllUser+++++++", this._user.Org);
    console.log("+++++++getAllUser+++++++", this._user.Email);
    this.userService.getAllUser(this._user.Org).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
      }
    });
  }
  sortByName() {
    if (this.isAscendingName) {
      this.orderName = "ASC";
    } else {
      this.orderName = "DESC";
    }
    this.userService.getAllUserOrderByName(this.orderName).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.isAscendingName = !this.isAscendingName;
      }
    });

  }
  sortByRole() {
    if (this.isAscendingRole) {
      this.orderRole = "ASC";
    } else {
      this.orderRole = "DESC";
    }
    this.userService.getAllUserOrderByRole(this.orderRole).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.isAscendingRole = !this.isAscendingRole;
      }
    });

  }
  sortByStatus() {
    if (this.isAscendingStatus) {
      this.orderStatus = "ASC";
    } else {
      this.orderStatus = "DESC";
    }
    this.userService.getAllUserOrderByStatus(this.orderStatus).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.isAscendingStatus = !this.isAscendingStatus;
      }
    });
  }
  sortByURE() {
    if (this.isAscendingURE) {
      this.orderURE = "ASC";
    } else {
      this.orderURE = "DESC";
    }
    this.userService.getAllUserOrderByURE(this.orderURE).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.isAscendingURE = !this.isAscendingURE;
      }
    });
  }
  sortByDate() {
    if (this.isAscendingDate) {
      this.orderDate = "ASC";
    } else {
      this.orderDate = "DESC";
    }
    this.userService.getAllUserOrderByDate(this.orderDate).subscribe((data) => {
      if (data.status) {
        this.results = data.result;
        this.isAscendingDate = !this.isAscendingDate;
      }
    });
  }
  existsDone() {
    this.userExists.hide();
    this.registrationForm.show();
  }
  userRegister() {
    this.isSubmitted = false;
    this.registrationForm.show();
  }
  userSettings(settingUserFirstName, settingUserlastName, settingUserEmail, userID, settingCurrentUserRole, settingCurrentUserStatus) {
    this.settingUserFirstName = settingUserFirstName;
    this.settingUserID = userID;
    this.sett_firstName = settingUserFirstName;
    this.sett_lastName = settingUserlastName;
    this.sett_email = settingUserEmail;
    this.settRoles = settingCurrentUserRole;
    this.status = settingCurrentUserStatus;
    this.accountSetting.show();
  }
  userDelete(userID) {
    this.settingUserID = userID;
    this.deleteAccount.show();
  }
  deleteClose() {
    this.deleteAccount.hide();
  }
  deleteDone() {
    this.userService.deleteUserAccount(this.settingUserID).subscribe((data) => {
      window.location.reload();
    });
  }
  get registrationFormControls() { return this.userRegistrationForm.controls; }
  get accountSettingFormControls() { return this.accountSettingForm.controls; }
  registration() {
    this.isSubmitted = true;
    let obj: any = {
      UserID: this._user._id,
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      Roles: this.roles,
      Org: this._user.Org,
      OrgAdmin:false,
      Active: true
    };
    console.log("this.isValidated", this.userRegistrationForm.valid);
    if (this.userRegistrationForm.valid) {
      this.userService.addUserRegistration(obj).subscribe((data) => {
        if (data.status) {
          this.createAccBtnDis = true;
          console.log(data);
          window.location.reload();;
        } else {
          this.registrationForm.hide();
          this.userExists.show();
        }
      });
    }
  }
  userAccountSetting() {
    this.isSettingSubmitted = true;
    let obj: any = {
      UserID: this._user._id,
      SettFirstName: this.sett_firstName,
      SettLastName: this.sett_lastName,
      SettRoles: this.settRoles,
      Status: this.status,
      SettingUserID: this.settingUserID
    };
    if (this.accountSettingForm.valid) {
      this.userService.addAccountSetting(obj).subscribe((data) => {
        if (data.status) {
          window.location.reload();
        }
      });
    }
  }
  masterlistproject() {
    localStorage.removeItem("tabforprocess");
    localStorage.removeItem("tabID");
    var projectradiobuttn = "project";
    var projecttabselection = "tab1"
    localStorage.setItem("tabforprocess", projectradiobuttn);
    localStorage.setItem("tabID", projecttabselection);
  }
}

