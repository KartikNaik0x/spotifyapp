import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  

  private apiUrl = 'http://35.181.234.128:8087/user';
  constructor(private http: HttpClient) {}
  register(userData: any): Observable<any> {
    console.log("called")
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userData);
  }
}
