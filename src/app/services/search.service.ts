import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Parent } from '../models/parent';
import { StudentParent } from '../models/student-parent';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private urlForSearchParents: string = Constants.CurrentBackEndHost + 'api/Group/Search';
  private urlForAddParent: string = Constants.CurrentBackEndHost + 'api/Parent/AddParent';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) {
  }

  searchParent(searchLine: string): Observable<Parent[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('searchCriteria', searchLine).
        set('roleId', '4');

    return this._http.get<Parent[]>(this.urlForSearchParents, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  addParent(studentParent: StudentParent) {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      content = studentParent;

    return this._http.post(this.urlForAddParent, content, { headers: headers }).pipe(
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
