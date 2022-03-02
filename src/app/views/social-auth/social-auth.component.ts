import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {
  email: string;
  message: string;
  isError: boolean = false;
  outerDomainEmail: string;
  emailAccountNotExist: string;
  emailRequestPending: string;
  accessToken: string;
  emailInactive: string;
  verifyEmail: boolean = false;
  outerEmail: boolean = false;
  emailNotExist: boolean = false;
  isEmailRequestPending: boolean = false;
  isEmailInactive: boolean = false;

 // @ViewChild('sendRequest', { static: false }) public sendRequest: ModalDirective;

  constructor(private router: Router, private authService: AuthenticationService) {

    this.router.routerState.root.queryParams.subscribe(params => {
      this.email = params['email'];
      this.outerDomainEmail = params['outer-domain-email'];
      this.emailAccountNotExist = params['account-exist'];
      this.emailRequestPending = params['request-pending'];
      this.accessToken = params['access-token'];
      this.emailInactive = params['inactive'];
      // console.log("access=", this.emailRequestPending);
      if (this.email) {
        this.verifyEmail = true;
        this.oauthLogin(this.email);
      } else if (this.outerDomainEmail) {
        this.isError = true;
        this.outerEmail = true;
      } else if (this.emailAccountNotExist) {
        this.isError = true;
        this.emailNotExist = true;
      } else if (this.emailRequestPending) {
        this.isError = true;
        this.isEmailRequestPending = true;
      } else if (this.emailInactive) {
        this.isError = true;
        this.isEmailInactive = true;
      }
    });
  }
  ngOnInit() {
  }

  oauthLogin(email) {
    this.authService.googleLogin(email).subscribe((data) => {

      if (data.status) {
        console.log("++++++++++++9999999+++++++++", data.result);
        console.log("++++++++++++9999999+++++++++", data.result.Roles[0].Roleid);
        localStorage.setItem('currentUser', JSON.stringify(data.result));
        //   //this.router.navigateByUrl('/dashboard');
        let userData = data.result;
        //   console.log(userData);
        if (userData && userData.Roles[0].Roleid == '1') {
          this.router.navigate(['/404']);
        } else if (userData && userData.Roles[0].Roleid == '2') {
          this.router.navigate(['/404']);
        } else if (userData && userData.Roles[0].Roleid == '3') {
          this.router.navigate(['/404']);
        } else if (userData && userData.Roles[0].Roleid == '4') {
          this.router.navigate(['/super-admin']);
        } else {
          this.router.navigate(['/404']);
        }
        return data;
      } else {
        this.emailNotExist = true;
      }

      // if (data.status) {
      //   localStorage.setItem('currentUser', JSON.stringify(data.result[0]));
      //   //this.router.navigateByUrl('/dashboard');
      //   let userData = data.result[0];
      //   console.log(userData);
      //   if (userData && userData.roleid == '1') {
      //     this.router.navigate(['/404']);
      //   } else if (userData && userData.roleid == '2') {
      //     this.router.navigate(['/404']);
      //   } else if (userData && userData.roleid == '3') {
      //     this.router.navigate(['/404']);
      //   } else {
      //     this.router.navigate(['/404']);
      //   }
      //   return data;
      // } else {
      //   this.emailNotExist = true;
      // }
    });
  }
  gotoLogin() {
    this.router.navigate(['/login']);
  }
  // sendLoginReq() {
  //   if (this.accessToken) {
  //     console.log("1696+96+96", this.accessToken);
  //     this.authService.sendLoginReq(this.accessToken).subscribe((data) => {
  //       if (data.status) {
  //         console.log("2696+96+96", this.accessToken);
  //         this.sendRequest.show();
  //       } else {
  //         this.emailNotExist = false;
  //         this.isEmailRequestPending = true;
  //       }
  //     });
  //   }
  // }
  sendDone() {
    this.router.navigate(['/login']);

  }
}
