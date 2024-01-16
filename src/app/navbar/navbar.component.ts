import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  // isLoginButtonVisible = true;
  // isRegisterButtonvisible=false;

  constructor(private authService : AuthService, private router:Router){}

  currentRoute: string | null = null;
  ngOnInit():void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  

  // onLoginClick():void{
  //   this.isLoginButtonVisible=false;
  //   this.isRegisterButtonvisible=true;
  // }

  // onRegisterClick():void{
  //   this.isLoginButtonVisible=true;
  //   this.isRegisterButtonvisible=false;
  // }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getUsername(): string | null {
    return this.authService.getUsername();
  }
  onLogoutClick(): void {
    this.authService.logout();
  }

}
