import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescreening',
  templateUrl: './prescreening.component.html',
  styleUrls: ['./prescreening.component.css']
})
export class PrescreeningComponent {


  selectedCategory: string = '';
  categoryId: string = 'default';

  constructor(
    private router: Router
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

    this.checkLocalStorageAndCloseTab();

    if (this.categoryId === 'none-of-the-above') {

      localStorage.setItem('ps', JSON.stringify(true));
      this.router.navigate(['/not-eligible']);

    } else {
      this.router.navigate(['/consent-and-demographic']);
    }

  } 

  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }

}
