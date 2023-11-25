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

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

}
