import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consent-and-demographic',
  templateUrl: './consent-and-demographic.component.html',
  styleUrls: ['./consent-and-demographic.component.css']
})
export class ConsentAndDemographicComponent {


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkLocalStorageAndCloseTab();
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  isFormSubmitted = false;

  onSubmit() {
    this.isFormSubmitted = true;
  }

  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }

}
