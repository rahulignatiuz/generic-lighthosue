import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserService } from '../../_services/user.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TimeoutError } from 'rxjs';
import { Constant } from '../../_global/constant';

@Component({
  selector: 'app-super-admin-user-management',
  templateUrl: './super-admin-user-management.component.html',
  styleUrls: ['./super-admin-user-management.component.scss']
})
export class SuperAdminUserManagementComponent implements OnInit {
  public results: any[];
  private _user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public avatarImg: string = '';
  public userRegistrationForm: FormGroup;
  public accountSettingForm: FormGroup;
  public firstName: string;
  public lastName: string;
  public email: string;
  public isSubmitted: boolean = false;
  public isSettingSubmitted: boolean = false;
  public settingUserFirstName: string;
  public sett_firstName: string;
  public sett_lastName: string;
  public sett_email: string;
  public settingUserID: number;
  public status: boolean;
  public paginations: any;
  public createAccBtnDis = false;
  public requestEmail: string;
  public organization: any;
  public org: any;
  public OrgName: String;
  public Url: String;
  public Logo: String;

  @ViewChild('registrationForm', { static: false }) public registrationForm: ModalDirective;
  @ViewChild('accountSetting', { static: false }) public accountSetting: ModalDirective;
  @ViewChild('deleteAccount', { static: false }) public deleteAccount: ModalDirective;
  @ViewChild('userExists', { static: false }) public userExists: ModalDirective;


  public constructor(private titleService: Title, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.titleService.setTitle("Lighthouse | Super Admin User Management");
    this.getAllUser();

    this.router.routerState.root.queryParams.subscribe(params => {
      this.requestEmail = params['request-email'];
      if (this.requestEmail) {
        console.log("requestEmail----*-*", this.requestEmail);

      }
    });

  }
  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators],
      email: ['', Validators.required],

    });
    this.accountSettingForm = this.formBuilder.group({
      sett_firstName: ['', Validators.required],
      sett_lastName: ['', Validators],
      sett_email: ['', Validators],

      status: ['', Validators.required]
    });

  }
  reloadfunction() {
    setTimeout(function () {
      window.location.reload();
    }, 4500);

  }
  hideloader() {
    document.getElementById('loading').style.display = 'none';
  }
  getAllUser() {
    this.userService.getAllUserForSuperAdmin().subscribe((data) => {
      console.log("+++++++getAllUser+++++++", data);

      if (data.status) {
        this.results = data.result;
      }
    });
  }
  getAllOrg() {
    this.userService.getAllOrg().subscribe((data) => {
      console.log("+++++++getAllOrg+++++++", data);

      if (data.status) {
        this.organization = data.result;
      }
    });
  }
  existsDone() {
    this.userExists.hide();
    this.registrationForm.show();
  }

  userRegister() {
    this.isSubmitted = false;
    this.getAllOrg();
    this.registrationForm.show();
  }
  userSettings(settingUserFirstName, settingUserlastName, settingUserEmail, userID, settingCurrentUserStatus) {
    this.settingUserFirstName = settingUserFirstName;
    this.settingUserID = userID;
    this.sett_firstName = settingUserFirstName;
    this.sett_lastName = settingUserlastName;
    this.sett_email = settingUserEmail;
    this.status = settingCurrentUserStatus;
    this.getAllOrg();
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
      Roles: 4,
      Active: true
    };
    console.log("this.isValidated", this.userRegistrationForm.valid);
    if (this.userRegistrationForm.valid) {

      this.userService.addUserRegistration(obj).subscribe((data) => {
        if (data.status) {
          this.createAccBtnDis = true;
          console.log(data);
          window.location.reload();
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
      Status: this.status,
      SettingUserID: this.settingUserID
    };
    console.log("+++userAccountSetting++++++++++++++++", this.accountSettingForm.valid);
    if (this.accountSettingForm.valid) {
      this.userService.addAccountSetting(obj).subscribe((data) => {
        if (data.status) {
          window.location.reload();
        }
      });
    }
  }
}


