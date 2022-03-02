import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../_services/user.service';
import { Constant } from '../../_global/constant';

@Component({
  selector: 'app-super-admin-settings',
  templateUrl: './super-admin-settings.component.html',
  styleUrls: ['./super-admin-settings.component.scss']
})
export class SuperAdminSettingsComponent implements OnInit {
  private _user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : [{ roled: 0 }];
  public results: any[];
  public isSubmitted: boolean = false;
  public organizationForm: FormGroup;
  public updateForm: FormGroup;
  public name: any;
  public subDomainName: any;
  public u_name: any;
  public u_subDomainName: any;
  public status: boolean;
  public orgId: any;
  public removeOrgId: any;
  public file: File = null;
  public active: boolean = true;
  public email: String;
  public OrgName: String;
  public Url: String;
  public Logo: string;
  public u_email: String;
  public orgUserId: any;

  @ViewChild('addOrgForm', { static: false }) public addOrgForm: ModalDirective;
  @ViewChild('updateOrgForm', { static: false }) public updateOrgForm: ModalDirective;
  @ViewChild('deleteOrg', { static: false }) public deleteOrg: ModalDirective;
  @ViewChild('addFile', { static: false }) public addFile: ElementRef;
  @ViewChild('updateFile', { static: false }) public updateFile: ElementRef;
  @ViewChild('orgDetails', { static: false }) public orgDetails: ModalDirective;



  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      subDomainName: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.updateForm = this.formBuilder.group({
      u_name: ['', Validators.required],
      u_subDomainName: ['', Validators.required],
      u_email: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllOrg();
  }
  getAllOrg() {
    this.userService.getAllOrg().subscribe((data) => {
      //  console.log("+++++++getAllOrg+++++++",data);
      if (data.status) {
        this.results = data.result;
        // console.log(this.results);
      }
    });
  }
  orgLogoUpload(event) {
    this.file = event.target.files[0];
  }
  addOrg() {
    this.isSubmitted = false;
    this.addFile.nativeElement.value = "";
    this.organizationForm.reset();
    this.addOrgForm.show();
  }
  remove(orgId) {
    this.removeOrgId = orgId;
    this.deleteOrg.show();
  }
  removeClose() {
    this.deleteOrg.hide();
  }
  removeDone() {
    console.log("+++++++++this.removeOrgId+++++++++++++++", this.removeOrgId);

    this.userService.deleteOrg(this.removeOrgId).subscribe((data) => {
      if (data.status) {
        console.log("+++++++++deleteOrg+++++++++++++++", data);
        this.deleteOrg.hide();
        this.getAllOrg();
      }
    });
  }
  sendEmail(userid) {

    this.userService.sendEmail(userid).subscribe((data) => {
      console.log("+++++++sendEmail+++++++", data);
      if (data.status) {
        // this.organization = data.result;
      }
    });
  }
  viewOrgDetail(orgName, url, logo) {
    this.OrgName = orgName;
    this.Url = url;
    this.Logo = Constant.baseURL + '/' + logo;
    this.orgDetails.show();
  }
  detailDone() {
    this.orgDetails.hide();
  }
  update(orgUserId, orgId, name, email, orgUrl, status) {
    this.orgUserId = orgId;
    this.orgId = orgUserId;
    this.u_email = email;
    this.u_name = name;
    this.u_subDomainName = orgUrl;
    this.status = status;
    this.updateOrgForm.show();
    this.updateFile.nativeElement.value = "";
  }
  get organizationFormControls() { return this.organizationForm.controls; }
  get updateFormControls() { return this.updateForm.controls; }

  organization() {
    this.isSubmitted = true;
    const formData = new FormData();
    let obj: any = {
      UserID: this._user._id,
      Name: this.name,
      SubDomainName: this.subDomainName,
      Email: this.email,
      Active: true
    };
    console.log("this.isValidated", this.organizationForm.valid);
    if (this.organizationForm.valid) {
      this.userService.addOrganization(obj).subscribe((data) => {
        console.log("+++++++++++addOrganization+++++++++++++", data.result._id);
        if (data.status) {
          if (this.file) {
            formData.append('File', this.file);
            formData.append('OrgId', data.result._id);
            this.userService.addLogo(formData).subscribe((data) => {
              if (data.status) {
                this.getAllOrg();
                this.addOrgForm.hide();
              }
            });
          } else {
            this.getAllOrg();
            this.addOrgForm.hide();
          }
        }
      });
    }
  }
  updateOrganization() {
    this.isSubmitted = true;
    const formData = new FormData();
    let obj: any = {
      OrgId: this.orgId,
      UserID: this._user._id,
      Name: this.u_name,
      Email: this.u_email,
      SubDomainName: this.u_subDomainName,
      Status: this.status,
    };
    console.log("this.isValidated", this.updateForm.valid);
    if (this.updateForm.valid) {
      this.userService.updateOrganization(obj).subscribe((data) => {
        console.log("+++++++++++updateForm+++++++++++++", data);
        if (data.status) {
          if (this.file) {
            formData.append('File', this.file);
            formData.append('OrgId', this.orgUserId);
            this.userService.addLogo(formData).subscribe((data) => {
              if (data.status) {
                this.isSubmitted = false;
                this.getAllOrg();
                this.updateOrgForm.hide();
              }
            });
          } else {
            this.isSubmitted = false;
            this.getAllOrg();
            this.updateOrgForm.hide();
          }
        }
      });
    }
  }
}
