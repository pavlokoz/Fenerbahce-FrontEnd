import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { School } from '../models/school';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private urlForGetSports: string = 'http://localhost:56833/api/School/GetAll';
  private urlForCreateGroup: string = 'http://localhost:56833/api/School/CreateSchool';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService) { }

  getSchools(): Observable<School[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<School[]>(this.urlForGetSports, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  createSchool(school: School): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),        
        headers = new HttpHeaders().
                    set('Content-Type', 'application/json').
                    set('Authorization', tokenData),        
       content = school;
    
    return this._http.post(this.urlForCreateGroup, content, { headers: headers }).pipe(
        catchError(this.handleError)
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
