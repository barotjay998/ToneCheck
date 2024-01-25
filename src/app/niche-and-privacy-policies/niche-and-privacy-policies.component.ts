import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-niche-and-privacy-policies',
  templateUrl: './niche-and-privacy-policies.component.html',
  styleUrls: ['./niche-and-privacy-policies.component.css']
})
export class NicheAndPrivacyPoliciesComponent {

  selectedCategory: string = '';
  categoryId: string = 'default';
  categories: string[] = [
    'education', 
    // 'information-technology', 
    'construction', 
    'legal-studies', 
    'business-and-economics', 
    'healthcare', 
    'transportation', 
    'social-sciences'
  ];

  // To keep track of which privacy policy is shown
  isShownCircle = false;
  isShownSquare = false;
  isShownTriangle = false;

  isGoNextButtonDisabled = true;

  buttons: any[] = [
    {
      icon: 'fa-solid fa-circle mx-1',
      label: 'Policy',
      onClick: () => this.onPolicyLink('c'),
      disabled: this.getFromLocalStorage('isShownCircle', this.isShownCircle)
    },
    {
      icon: 'fa-solid fa-square mx-1',
      label: 'Policy',
      onClick: () => this.onPolicyLink('s'),
      disabled: this.getFromLocalStorage('isShownSquare', this.isShownSquare)
    },
    {
      icon: 'fa-solid fa-play mx-1',
      label: 'Policy',
      onClick: () => this.onPolicyLink('t'),
      disabled: this.getFromLocalStorage('isShownTriangle', this.isShownTriangle)
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.checkLocalStorageAndCloseTab();
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let categoryId = params.get('categoryId')!;

      if (categoryId && this.categories.includes(categoryId)) {
        this.categorySelected(categoryId);
      }
    });

    // Shuffle the buttons array to randomize their order
    this.shuffleArray(this.buttons);

    this.isGoNextButtonDisabled = !this.isGoNext();
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
    else {
      this.selectedCategory = '';
    }
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  onPolicyLink(policyId: string) {

    if (this.categoryId === 'default') {
      alert('Please select a category.');
      return;
    }

    // Change the isShown property of the policy that was clicked
    if (policyId === 'c') {
      this.isShownCircle = true;
      localStorage.setItem('isShownCircle', JSON.stringify(this.isShownCircle));
    }
    else if (policyId === 's') {
      this.isShownSquare = true;
      localStorage.setItem('isShownSquare', JSON.stringify(this.isShownSquare));
    }
    else if (policyId === 't') {
      this.isShownTriangle = true;
      localStorage.setItem('isShownTriangle', JSON.stringify(this.isShownTriangle));
    }

    this.router.navigate(['/policy', this.categoryId, policyId]);
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
    
  }

  // Function to shuffle an array randomly
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function that gets a value from the local storage 
  // and sets it to a default value if it doesn't exist
  private getFromLocalStorage(key: string, defaultValue: boolean): boolean {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  }

  isGoNext() {
    if (this.getFromLocalStorage('isShownCircle', this.isShownCircle) && 
        this.getFromLocalStorage('isShownSquare', this.isShownSquare) && 
        this.getFromLocalStorage('isShownTriangle', this.isShownTriangle)) 
      {
      return true;
    } else {
      return false;
    }
  }

  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }
}
