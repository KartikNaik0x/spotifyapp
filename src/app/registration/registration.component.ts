import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  constructor(private registerService:RegisterService,private router:Router){}

  showMessage: boolean = false;
  messageType: string = ''; // 'success' or 'error'
  messageText: string = '';

  emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm = new FormGroup({
    username : new FormControl("",[Validators.required  , Validators.maxLength(20) ]),
    firstname : new FormControl("",[Validators.required  , Validators.maxLength(32) ]),
    lastname : new FormControl("",[Validators.required  , Validators.maxLength(32) ]),
    email : new FormControl("",[Validators.required  , Validators.maxLength(32) , Validators.pattern(this.emailReg)]),
    password : new FormControl("",[Validators.required  , Validators.maxLength(32) ]),
    mobileNumber : new FormControl("",[Validators.required , Validators.maxLength(10),Validators.minLength(10) ]),


  })

  getControl(name:any):AbstractControl | null{
    return this.registerForm.get(name);
  }

  registerFn():void{
    
    console.log(this.registerForm.value);
      this.registerService.register(this.registerForm.value).subscribe(
        (response) => {
          // Handle successful registration, e.g., redirect to login page
          this.showMessage = true;
        this.messageType = 'success';
        this.messageText = 'Registration successful';
          // console.log('Registration successful', response);
          setTimeout(() => {
            // Redirect to the login page after successful registration
            this.router.navigate(['/login']);
          }, 3000);
          
          
        },
        (error) => {
         
         
         
          
          this.showMessage = true;
          this.messageType = 'error';
          this.messageText = error.error;
        }
      );
  }

}
