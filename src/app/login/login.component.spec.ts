import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setLogIn', 'setUsername']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set form controls properly', () => {
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });
  it('should call loginFn and navigate to /home on successful login', () => {
    authService.login.and.returnValue(of({ token: 'mockToken' }));
    const navigateSpy = router.navigate.and.returnValue(Promise.resolve(true));
    component.loginForm.setValue({ username: 'testUser', password: 'testPassword' });
    component.loginFn();
    expect(authService.login).toHaveBeenCalledWith({ username: 'testUser', password: 'testPassword' });
    expect(localStorage.getItem('token')).toBe('mockToken');
    expect(localStorage.getItem('username')).toBe('testUser');
    expect(authService.setLogIn).toHaveBeenCalledWith(true);
    expect(authService.setUsername).toHaveBeenCalledWith('testUser');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(component.showMessage).toBe(false);
  });
 
});
