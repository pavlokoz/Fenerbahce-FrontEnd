import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlForGetUsers: string = Constants.CurrentBackEndHost + 'api/User/GetUsers';
  private urlForDelete: string = Constants.CurrentBackEndHost + 'api/User/DeleteUser';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  getUsers(): Observable<User[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<User[]>(this.urlForGetUsers, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  deleteUser(userId: number): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),        
        headers = new HttpHeaders().
                    set('Content-Type', 'application/json').
                    set('Authorization', tokenData),        
        params = new HttpParams().
                    set('userId', userId.toString());
    
    return this._http.delete(this.urlForDelete, { headers: headers, params: params }).pipe(
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
