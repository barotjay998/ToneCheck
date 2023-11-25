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
  categories: string[] = ['education', 'information-technology', 'construction', 'legal-studies', 'business-and-economics', 'healthcare', 'transportation', 'social-sciences'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let categoryId = params.get('categoryId')!;

      if (categoryId && this.categories.includes(categoryId)) {
        this.categorySelected(categoryId);
      }

    });
  }

  categorySelected(categoryId: string) {
    this.categoryId = categoryId;

    if (categoryId === 'education') {
      this.selectedCategory = 'Education';
    }
    else if (categoryId === 'information-technology') {
      this.selectedCategory = 'Information Technology';
    }
    else if (categoryId === 'construction') {
      this.selectedCategory = 'Construction';
    }
    else if (categoryId === 'legal-studies') {
      this.selectedCategory = 'Legal Studies';
    }
    else if (categoryId === 'business-and-economics') {
      this.selectedCategory = 'Business and Economics';
    }
    else if (categoryId === 'healthcare') {
      this.selectedCategory = 'Healthcare';
    }
    else if (categoryId === 'transportation') {
      this.selectedCategory = 'Transportation';
    }
    else if (categoryId === 'social-sciences') {
      this.selectedCategory = 'Social Sciences';
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

    this.router.navigate(['/policy', this.categoryId, policyId]);
  }

  onCategoryChange() {

    if (this.selectedCategory === 'Education') {
      this.categoryId = 'education';
    }
    else if (this.selectedCategory === 'Information Technology') {
      this.categoryId = 'information-technology';
    }
    else if (this.selectedCategory === 'Construction') {
      this.categoryId = 'construction';
    }
    else if (this.selectedCategory === 'Legal Studies') {
      this.categoryId = 'legal-studies';
    }
    else if (this.selectedCategory === 'Business and Economics') {
      this.categoryId = 'business-and-economics';
    }
    else if (this.selectedCategory === 'Healthcare') {
      this.categoryId = 'healthcare';
    }
    else if (this.selectedCategory === 'Transportation') {
      this.categoryId = 'transportation';
    }
    else if (this.selectedCategory === 'Social Sciences') {
      this.categoryId = 'social-sciences';
    }
    
  }

}
