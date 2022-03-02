import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, CanLoad, ActivatedRouteSnapshot, Route, Router, UrlSegment, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(private userService:UserService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  checkLogin(url): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {            
    if(localStorage.getItem('currentUser')) {
      let userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';      
      if(userData && url == '/') {
        if(userData.roleId == '1') {
          this.router.navigate(['/admin']); 
        } else         if(userData.roleId == '2') {
          this.router.navigate(['/pm']); 
        } else         if(userData.roleId == '3') {
          this.router.navigate(['/user']); 
        }          
        return false;  
      } else if(userData && userData.roleId == '1' && (url.match('pm') || url.match('user'))) {
        return false;
      } else if(userData && userData.roleId == '2' && (url.match('admin') || url.match('user'))) { 
        return false;
      } else if(userData && userData.roleId == '3' && (url.match('admin') || url.match('pm'))) { 
        return false;
      } else {
        return true;
      }            
    } else {   
      this.router.navigate(['/login']);   
      return false;
    }
  }
  
}
