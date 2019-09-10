import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { School } from '../models/school';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private urlForGetSchools: string = Constants.CurrentBackEndHost + 'api/School/GetAll';
  private urlForGetSchool: string = Constants.CurrentBackEndHost + 'api/School/GetSchoolById';
  private urlForCreateGroup: string = Constants.CurrentBackEndHost + 'api/School/CreateSchool';
  private urlForGetSchoolLogo: string = Constants.CurrentBackEndHost + 'api/School/GetSchoolImage';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  getSchools(): Observable<School[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<School[]>(this.urlForGetSchools, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getSchoolLogoById(schoolId: number): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Authorization', tokenData),
      params = new HttpParams().
            set('schoolId', schoolId.toString());   

    return this._http.get(this.urlForGetSchoolLogo, { headers: headers, params: params, responseType: 'blob' }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getSchoolById(schoolId: number): Observable<School> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
            set('schoolId', schoolId.toString());   

    return this._http.get<School>(this.urlForGetSchool, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  createSchool(schoolName: string, logo: FormData): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),        
        headers = new HttpHeaders().                   
                    set('Authorization', tokenData),        
        content = logo,
        params = new HttpParams().
                    set('schoolName', schoolName);   
    
    return this._http.post(this.urlForCreateGroup, content, { headers: headers, params: params }).pipe(
        catchError(res => {
          this.snackBar.open("An Error Occured! Please, try again", "Got it", {
            duration: 2000
          });
          return this.handleError(res);
        })
    );
}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
