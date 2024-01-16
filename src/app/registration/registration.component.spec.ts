import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RegisterService } from '../register.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let router:Router;
  beforeEach(() => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: RegisterService, useValue: registerServiceSpy }]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with empty values', () => {
    expect(component.registerForm.value).toEqual({
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      mobileNumber: ''
    });
  });
  it('should set error message on registration failure', () => {
    const errorMessage = 'Registration failed';
    registerService.register.and.returnValue(throwError({ error: errorMessage }));
    component.registerFn();
    expect(component.showMessage).toBeTrue();
    expect(component.messageType).toBe('error');
    expect(component.messageText).toBe(errorMessage);
  });
  it('should redirect to login page on successful registration', () => {
    const successMessage = 'Registration successful';
    registerService.register.and.returnValue(of({}));
    component.registerFn();
    expect(component.showMessage).toBeTrue();
    expect(component.messageType).toBe('success');
    expect(component.messageText).toBe(successMessage);
    // Redirect should happen after a delay (3000 ms in this case)
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
  it('should call register service with form values', () => {
    const formValues = {
      username: 'testuser',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      mobileNumber: '1234567890'
    };
    component.registerForm.setValue(formValues);
    registerService.register.and.returnValue(of({}));
    component.registerFn();
    expect(registerService.register).toHaveBeenCalledWith(formValues);
  });
});