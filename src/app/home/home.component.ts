import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClickworkerTcApiService } from '../services/clickworker-tc-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

}
