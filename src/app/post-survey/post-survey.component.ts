import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrls: ['./post-survey.component.css']
})
export class PostSurveyComponent {

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
