import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }


  getEducationData(): Observable<any>  {
    var url = `${environment.api_url}/education-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getInformationTechnologyData(): Observable<any>  {
    var url = `${environment.api_url}/information-technology-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getConstructionData(): Observable<any>  {
    var url = `${environment.api_url}/construction-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getLegalStudiesData(): Observable<any>  {
    var url = `${environment.api_url}/legal-studies-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getBusinessAndEconomicsData(): Observable<any>  {
    var url = `${environment.api_url}/business-and-economics-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getHealthCareData(): Observable<any>  {
    var url = `${environment.api_url}/healthcare-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getTransportationData(): Observable<any>  {
    var url = `${environment.api_url}/transportation-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  getSocialSciencesData(): Observable<any>  {
    var url = `${environment.api_url}/social-sciences-data.json`;

    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
