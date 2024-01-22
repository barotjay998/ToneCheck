import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkLocalStorageAndCloseTab();
  }

  onInternalLink(linkUri: string) {
    this.router.navigate([linkUri]);
  }

  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }

}
