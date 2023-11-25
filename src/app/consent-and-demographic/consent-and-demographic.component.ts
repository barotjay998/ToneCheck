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

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }


}
