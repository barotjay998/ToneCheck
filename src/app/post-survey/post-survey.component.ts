import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetsServiceService } from '../services/sheets-service.service';

@Component({
  selector: 'app-post-survey',
  templateUrl: './post-survey.component.html',
  styleUrls: ['./post-survey.component.css']
})
export class PostSurveyComponent {

  categoryId: any = 'default';

  constructor(
    private router: Router,
    private sheetService: SheetsServiceService,
  ) { }

  ngOnInit() {
    this.checkLocalStorageAndCloseTab();

    this.categoryId = localStorage.getItem('category');
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  isFormSubmitted = false;

  onSubmit() {
    this.isFormSubmitted = true;

    this.sheetService.postCategory(this.categoryId).subscribe(response => {
      // console.log('Category posted', response);
    });
  }


  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }

}
