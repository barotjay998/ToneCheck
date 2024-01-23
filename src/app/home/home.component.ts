import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClickworkerTcApiService } from '../services/clickworker-tc-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private customerService: ClickworkerTcApiService
  ) { }

  ngOnInit() {
    this.checkCustomer(1234);
    this.addCustomer(1234);
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  checkCustomer(customerId: number) {
    this.customerService.checkCustomer(customerId).subscribe({
      next: (response) => console.log(response.message),
      error: (error) => console.error(error.error.message)
    });
  }

  addCustomer(customerId: number) {
    this.customerService.addCustomer(customerId).subscribe({
      next: (response) => console.log(response.message),
      error: (error) => console.error(error.error.message)
    });
  }

}
