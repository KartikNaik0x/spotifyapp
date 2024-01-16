import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  private apiUrl = "http://35.181.234.128:8087"

  addToWishlist(albumData: any): void {
    // Get the username from local storage
    const username = localStorage.getItem('username');
    // Check if the username is available
   
      // Add the username to the payload
      const wishlistPayload = {
        userId: username,
        ...albumData
      };
      const token = localStorage.getItem('token');
      // Set up headers with Authorization Bearer token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Include headers in the HTTP options
      const options = { headers: headers };
      // Make the HTTP POST request
      this.http.post('http://35.181.234.128:8087/wishlist/add', wishlistPayload,options).subscribe(
        (response) => {
          console.log('Added to wishlist:', response);
        },
        (error) => {
          console.error('Error adding to wishlist:', error);
        }
      );
    
  }

  getPlaylist(username: string): Observable<any> {
    const url = `${this.apiUrl}/wishlist/items/${username}`;
    const token = localStorage.getItem('token');
    // Set up headers with Authorization Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Include headers in the HTTP options
    const options = { headers: headers };
    return this.http.get(url,options);
  }
}
