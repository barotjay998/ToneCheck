import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {

  categoryId: string = '';
  policyId: string = '';
  categories: string[] = ['education', 'information-technology', 'construction', 
  'legal-studies', 'business-and-economics', 'healthcare', 'transportation', 'social-sciences'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('domainId')!;
      this.policyId = params.get('policyId')!;
    });

    this.loadPolicyData();
  }

  policyData: any = {};

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

    if (this.policyId === 'c') {
      this.policyData = data[0];
    }
    else if (this.policyId === 's') {
      this.policyData = data[1];
    }
    else if (this.policyId === 't') {
      this.policyData = data[2];
    }

  }

  onBackBtn(linkUri: string) {
    let cId = this.categoryId ? this.categoryId : 'default';
    this.router.navigate([linkUri, {categoryId: cId}]);
  }

}
