import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetsServiceService {

  private googleAppsScriptWebAppUrl = 'https://script.google.com/macros/s/AKfycbwWAWULtoe-Q8-JcWWeqeb6i35PW-YUh-nbG_awLWlZZSbrSpRHYTQi8fAjQv9PQW7Idw/exec'; // Replace with your Web App URL

  constructor(private http: HttpClient) {}

  logIpAddress(ipAddress: string) {
    const data = { IpAddress: ipAddress };
    return this.http.post(this.googleAppsScriptWebAppUrl, data);
  }

}
