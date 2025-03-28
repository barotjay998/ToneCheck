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
  isShowPleaseWait: boolean = false;

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

    // if (categoryId === 'education') {
    //   this.selectedCategory = 'Education & Training';
    // }
    // else if (categoryId === 'information-technology') {
    //   this.selectedCategory = 'Software & IT';
    // }
    if (categoryId === 'construction') {
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

    // if (this.selectedCategory === 'Education & Training') {
    //   this.categoryId = 'education';
    // }
    // else if (this.selectedCategory === 'Software & IT') {
    //   this.categoryId = 'information-technology';
    // }
    if (this.selectedCategory === 'Engineering') {
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

    // // Show please wait
    this.isShowPleaseWait = true;

    // // Check if the IP Address exists, 
    // // if it does, we redirect to not-eligible.
    const modifiedIpAddress = this.removeLastSubnet(this.ipAddress);
    const ipExists = await this.checkIfIpExists(modifiedIpAddress);

    if (ipExists) {
      return;
    }

    // Check if we have space in the category, if not, we redirect to category full.
    const isCategoryFull = await this.checkIfFull();

    if (isCategoryFull) {
      return;
    }

    // // If the IP Address does not exist, we log it, before we do anything else, 
    // // Do do it to so that user cannot submit anything else again.
    await this.logIp(modifiedIpAddress);

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
          if (this.categoryId === 'none-of-the-above') {
            this.router.navigate(['/not-eligible']);
          } else {
            this.router.navigate(['/category-full']);
          }
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

  removeLastSubnet(ipAddress: string): string {
    const ipParts = ipAddress.split('.');
    if (ipParts.length === 4) {
        // Remove the last subnet
        ipParts.pop();
        // Join the remaining parts
        return ipParts.join('.');
    } else {
        // Handle invalid IP address format
        throw new Error('Invalid IP address format');
    }
  }

  checkIfFull(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.sheetsService.getCategory(this.categoryId).subscribe((response: any) => {
        if (response.count >= 10)  {
          // console.log('Category full: ', response.count);
          this.router.navigate(['/category-full']);
          resolve(true);
        } else {
          // console.log('Category not full: ', response.count);

          // Save the category in local storage
          localStorage.setItem('category', this.categoryId);

          resolve(false);
        }

      }, error => {
        reject(error);
      });
    });
  }


}
