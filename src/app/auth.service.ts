import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private username: string | null = null;

  private apiUrl = 'http://35.181.234.128:8087/auth';
  constructor(private http: HttpClient, private router:Router) {}

  
  login(credentials:any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    
    return this.http.post(url, credentials);
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }

  setLogIn(value:boolean){
    this.loggedIn=value;
  }

    // Check if the user is logged in
    isLoggedIn(): boolean {
      return !!this.getToken();
    }

    private getToken(): string | null {
      return localStorage.getItem('token');
    }

      // Get the username
  getUsername(): string | null {
    return localStorage.getItem('username')
  }
  setUsername(name:any){
      this.username=name;
  }
}
