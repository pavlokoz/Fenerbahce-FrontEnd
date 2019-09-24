import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private urlForDeleteParent: string = Constants.CurrentBackEndHost + 'api/Parent/DeleteParent';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  
deleteParent(parentId: number, studentId: number): Observable<any> {
  let tokenData = 'Bearer ' + this.authService.getToken(),        
      headers = new HttpHeaders().
                  set('Content-Type', 'application/json').
                  set('Authorization', tokenData),        
      params = new HttpParams().
                  set('parentId', parentId.toString()).
                  set('studentId', studentId.toString());
  
  return this._http.delete(this.urlForDeleteParent, { headers: headers, params: params }).pipe(
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
