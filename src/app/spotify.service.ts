import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private httpClient:HttpClient) { }

  private apiUrl = "http://35.181.234.128:8087/spotify/search/";

  searchTracks(query:String): Observable<any> {
      const url = `${this.apiUrl}${query}`;

      const token = localStorage.getItem('token');
    // Set up headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Include headers in the HTTP options
    const options = { headers: headers };

      return this.httpClient.get(url,options);
  }




}
