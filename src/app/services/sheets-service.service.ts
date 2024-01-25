import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetsServiceService {

  private googleAppsScriptWebAppUrl = 'https://script.google.com/macros/s/AKfycbwx9D-XhDO3iXMMwrr8ozXeUUfP6qW8mYRy1FuW4l0Q7x3HlYCg_xVQ4RsSLtJiAMeXRQ/exec'; // Replace with your Web App URL

  constructor(private http: HttpClient) {}

  logIpAddress(ipAddress: string) {
    const data = { IpAddress: ipAddress };
    return this.http.post(this.googleAppsScriptWebAppUrl, data);
  }

}
