import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-not-eligible',
  templateUrl: './not-eligible.component.html',
  styleUrls: ['./not-eligible.component.css']
})
export class NotEligibleComponent  {

  ipAddress: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the IP address
    this.http.get<{origin: string}>('https://httpbin.org/ip')
      .subscribe(response => {
        this.ipAddress = response.origin;
      }, error => {
        console.error('Error fetching IP address:', error);
      });
  }

} 
