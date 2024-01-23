import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickworkerTcApiService {

  private apiUrl = 'https://54.173.156.60'; // Adjust the URL based on your Flask server configuration

  constructor(private http: HttpClient) { }

  checkCustomer(customerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${customerId}`);
  }

  addCustomer(customerId: number): Observable<any> {
    return this.http.post(this.apiUrl, { customer_id: customerId });
  }

}
