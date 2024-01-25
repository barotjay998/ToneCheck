import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetsServiceService {

  private googleAppsScriptWebAppUrl = 'https://script.google.com/macros/s/AKfycbzvVWBKzluaAyWhDZsgL4y-kNPYL9bbjd4VMY6_iEwI1jT7QW5R1jJ071z8JMRwFhz0Ng/exec'; // Replace with your Web App URL

  constructor(private http: HttpClient) {}

  logIpAddress(ipAddress: string) {
    const data = { IpAddress: ipAddress };
    return this.http.post(this.googleAppsScriptWebAppUrl, data);
  }

}
