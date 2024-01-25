import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetsServiceService {

  private netlifyFunctionUrl = '/.netlify/functions/log-ip-address'; // Netlify Function endpoint

  constructor(private http: HttpClient) {}

  logIpAddress(ipAddress: string) {
    const data = { IpAddress: ipAddress };
    return this.http.post(this.netlifyFunctionUrl, data);
  }

  checkIfIpExists(ipAddress: string) {
    return this.http.get(`/.netlify/functions/check-ip-exists?ipAddress=${ipAddress}`);
  }

}
