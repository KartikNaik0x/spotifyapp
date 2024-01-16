import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private authService:AuthService, private router:Router){}

  showMessage: boolean = false;
  messageType: string = ''; 
  messageText: string = '';

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  getControl(name: any): AbstractControl | null {
    return this.loginForm.get(name);
  }
  loginFn(): void {
    console.log(this.loginForm.value);
    const{username , password}= this.loginForm.value;
    
    this.authService.login(this.loginForm.value).subscribe(
      (data ) => {
        console.log(data)
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',username!);
        this.authService.setLogIn(true);
        this.authService.setUsername(username);
        // Redirect to a different page after successful login
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error.error);
        this.showMessage = true;
        this.messageType = 'error';
        this.messageText ="Either username or password is incorrect";
      
      }
    );
  }
}
