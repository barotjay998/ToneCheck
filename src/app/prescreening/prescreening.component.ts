import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SheetsServiceService } from '../services/sheets-service.service';

@Component({
  selector: 'app-prescreening',
  templateUrl: './prescreening.component.html',
  styleUrls: ['./prescreening.component.css']
})
export class PrescreeningComponent {


  selectedCategory: string = '';
  categoryId: string = 'default';
  ipAddress: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private sheetsService: SheetsServiceService
  ) { }

  ngOnInit() {
  }

  categorySelected(categoryId: string) {
    this.categoryId = categoryId;

    if (categoryId === 'education') {
      this.selectedCategory = 'Education & Training';
    }
    // else if (categoryId === 'information-technology') {
    //   this.selectedCategory = 'Software & IT';
    // }
    else if (categoryId === 'construction') {
      this.selectedCategory = 'Engineering';
    }
    else if (categoryId === 'legal-studies') {
      this.selectedCategory = 'Juridical Sciences (Law)';
    }
    else if (categoryId === 'business-and-economics') {
      this.selectedCategory = 'Banking & Financial';
    }
    else if (categoryId === 'healthcare') {
      this.selectedCategory = 'Healthcare';
    }
    else if (categoryId === 'transportation') {
      this.selectedCategory = 'Retail, Wholesale & Distribution';
    }
    else if (categoryId === 'social-sciences') {
      this.selectedCategory = 'Non-Profit';
    }
    else if (categoryId === 'none-of-the-above') {
      this.selectedCategory = 'None of the above';
    }
    else {
      this.selectedCategory = '';
    }
  }

  onCategoryChange() {

    if (this.selectedCategory === 'Education & Training') {
      this.categoryId = 'education';
    }
    // else if (this.selectedCategory === 'Software & IT') {
    //   this.categoryId = 'information-technology';
    // }
    else if (this.selectedCategory === 'Engineering') {
      this.categoryId = 'construction';
    }
    else if (this.selectedCategory === 'Juridical Sciences (Law)') {
      this.categoryId = 'legal-studies';
    }
    else if (this.selectedCategory === 'Banking & Financial') {
      this.categoryId = 'business-and-economics';
    }
    else if (this.selectedCategory === 'Healthcare') {
      this.categoryId = 'healthcare';
    }
    else if (this.selectedCategory === 'Retail, Wholesale & Distribution') {
      this.categoryId = 'transportation';
    }
    else if (this.selectedCategory === 'Non-Profit') {
      this.categoryId = 'social-sciences';
    }
    else if (this.selectedCategory == "None of the above") {
      this.categoryId = "none-of-the-above";
    }
  }

  onSubmit() {


    if (this.categoryId === 'none-of-the-above') {

      localStorage.setItem('ps', JSON.stringify(true));
      // fetch the IP address
      this.logIp(this.fetchLocalIp());
      this.router.navigate(['/not-eligible']);

    } else {
      
      if (this.checkNotEligible()) {
        this.router.navigate(['/category-full']);
      } else {
        this.router.navigate(['/consent-and-demographic']);
      }
      
    }

  } 

  checkNotEligible(): boolean {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      return true;

    } else {
      return false;

    }
  }

  fetchLocalIp():any {
    // Fetch the IP address
    this.http.get<{origin: string}>('https://httpbin.org/ip')
      .subscribe(response => {
        this.ipAddress = response.origin;
        return this.ipAddress;
      }, error => {
        console.error('Error fetching IP address:', error);
      });
  }

  logIp(ipAddress: string) {
    this.sheetsService.logIpAddress(ipAddress).subscribe(response => {
      console.log('IP Address logged', response);
    }, error => {
      console.error('Error logging IP Address', error);
    });
  }

}
