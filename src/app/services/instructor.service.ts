import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Instructor } from '../models/instructor';
import { GroupInstructor } from '../models/group-instructor';
import { AuthorizationService } from './authorization.service';
import { Group } from '../models/group';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private urlForGetInstructors: string = Constants.CurrentBackEndHost + 'api/Instructor/GetInstructors';
  private urlForAddInstructor: string = Constants.CurrentBackEndHost + 'api/Instructor/AddInstructor';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  getInstructors(): Observable<Instructor[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<Instructor[]>(this.urlForGetInstructors, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  addInstructor(groupInstructor: GroupInstructor): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),        
        headers = new HttpHeaders().
                    set('Content-Type', 'application/json').
                    set('Authorization', tokenData),        
       content = groupInstructor;
    
    return this._http.post(this.urlForAddInstructor, content, { headers: headers }).pipe(
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
