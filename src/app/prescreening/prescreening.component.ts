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
    this.fetchLocalIp();
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

  async onSubmit() {

    // Check if the IP Address exists, 
    // if it does, we redirect to not-eligible.
    const ipExists = await this.checkIfIpExists(this.ipAddress);

    if (ipExists) {
      return;
    }

    // If the IP Address does not exist, we log it, before we do anything else, 
    // Do do it to so that user cannot submit anything else again.
    await this.logIp(this.ipAddress);

    // If the user selects 'None of the above', we redirect to not-eligible,
    // and also remember on client side that the user is not eligible. So that
    // even if the user uses VPN to change IP Address, we still remember that.
    if (this.categoryId === 'none-of-the-above') {
      localStorage.setItem('ps', JSON.stringify(true));
      this.router.navigate(['/not-eligible']);

    } else {

      // If the user is eligible, we first make sure that the we had not
      // previously marked the user as not eligible.
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


  /* 
  Fetches the client's IP Address.
  */
  fetchLocalIp():any {
    // Fetch the IP address
    this.http.get<{origin: string}>('https://httpbin.org/ip')
      .subscribe(response => {
        this.ipAddress = response.origin;
      }, error => {
        console.error('Error fetching IP address:', error);
      });
  }


  /*
  Logs the IP Address in the database.
  */
  logIp(ipAddress: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
    this.sheetsService.logIpAddress(ipAddress).subscribe(response => {
      // console.log('IP Address logged', response);
      resolve();
    }, error => {
      // console.error('Error logging IP Address', error);
      reject();
    });
    });
  }


  /*
  Checks if the IP Address exists in the database, if it does, redirect to category full.
  */
  checkIfIpExists(ipAddress: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
    this.sheetsService.checkIfIpExists(ipAddress).subscribe((response: any) => {
        if (response.exists) {
          // console.log('IP Address exists');
          this.router.navigate(['/category-full']);
          resolve(true);
        } else {
          resolve(false);
        }

    }, error => {
        // console.error('Error checking if IP Address exists', error);
        reject(error);
    });
    });
  }


}
