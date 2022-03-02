import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errForms: boolean = false;
  message: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService, private titleService: Title) {
    this.titleService.setTitle("Lighthouse | Login");
    // this.router.navigate(['/user']); 
    let userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    // console.log(userData);
    if (userData && userData.roleid == '1') {
      this.router.navigate(['/admin']);
    } else if (userData && userData.roleid == '2') {
      this.router.navigate(['/pm']);
    } else if (userData && userData.roleid == '3') {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.required
      ])],
      password: ['', Validators.required]
    });

  }
  get formControls() { return this.loginForm.controls; }
  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // this.authService.login(this.formControls.username.value, this.formControls.password.value).subscribe((data) => {
    //   if (data.status) {
    //     localStorage.setItem('currentUser', JSON.stringify(data.result[0]));
    //     //this.router.navigateByUrl('/dashboard');
    //     let userData = data.result[0];
    //     console.log(userData);
    //     if (userData && userData.roleid == '1') {
    //       this.router.navigate(['/admin']);
    //     } else if (userData && userData.roleid == '2') {
    //       this.router.navigate(['/pm']);
    //     } else if (userData && userData.roleid == '3') {
    //       this.router.navigate(['/user']);
    //     } else {
    //       this.router.navigate(['/dashboard']);
    //     }
    //     return data;
    //   } else {
    //     this.errForms = true;
    //     //err message
    //     this.message = data.message

    //   }
    // });
  }
  googleLogin() {
    this.authService.googleLoginURL().subscribe((data) => {
      console.log(data);
      if (data) {
        document.location.href = data.url;
        // this.authService.googleLogin().subscribe((data) => {
        //   console.log("googleLogin",data);
        // });
      }
    });
  }

}