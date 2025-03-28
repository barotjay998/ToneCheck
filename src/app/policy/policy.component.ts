import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit, OnDestroy {

  categoryId: string = '';
  policyId: string = '';
  categories: string[] = ['education', 'information-technology', 'construction', 
  'legal-studies', 'business-and-economics', 'healthcare', 'transportation', 'social-sciences'];

  shape: any;

  countdown: number = 60; // Initial countdown time in seconds
  isBtnDisabled: boolean = false; // Initialize the button disable state
  private countdownSubscription: Subscription | undefined; // Countdown subscription

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any): void {
    // Prevent the default behavior of the back button
    window.history.forward();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    this.checkLocalStorageAndCloseTab();
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('domainId')!;
      this.policyId = params.get('policyId')!;
    });

    this.loadPolicyData();
    this.loadShapeData();
    this.startCountdown();
  }

  policyData: any = {};

  loadShapeData() {

    if (this.policyId == 'c') {
      this.shape =  {
        name: 'Circle',
        icon: 'fa-solid fa-circle mx-1'
      };
    } else if (this.policyId == 's') {
      this.shape =  {
        name: 'Square',
        icon: 'fa-solid fa-square mx-1'
      };
    } else if (this.policyId == 't') {
      this.shape =  {
        name: 'Triangle',
        icon: 'fa-solid fa-play mx-1'
      };
    }

  }


  loadPolicyData() {

    if (this.categoryId === 'education') {
      this.dataService.getEducationData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'information-technology') {
      this.dataService.getInformationTechnologyData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'construction') {  
      this.dataService.getConstructionData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'legal-studies') {
      this.dataService.getLegalStudiesData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'business-and-economics') {
      this.dataService.getBusinessAndEconomicsData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'healthcare') {
      this.dataService.getHealthCareData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'transportation') {
      this.dataService.getTransportationData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }
    else if (this.categoryId === 'social-sciences') {
      this.dataService.getSocialSciencesData().subscribe((data: any) => {
        this.selectTone(data);
      });
    }

  }

  selectTone(data: any) {

    // c - Formal Legal
    // s - Casual Conversational
    // t - User Centric Empathetic

    if (this.policyId === 'c') {
      this.policyData = data[0];
    }
    else if (this.policyId === 's') {
      this.policyData = data[1];
    }
    else if (this.policyId === 't') {
      this.policyData = data[2];
    }

    // console.log(this.policyData);

  }

  onBackBtn(linkUri: string) {
    let cId = this.categoryId ? this.categoryId : 'default';
    this.router.navigate([linkUri, {categoryId: cId}]);
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.isBtnDisabled = true; // Countdown is complete, disable the button
      }
    });
  }

  checkLocalStorageAndCloseTab(): void {
    const value = localStorage.getItem('ps');

    if (value === 'true') {
      this.router.navigate(['/not-eligible']);
    }
  }

}
