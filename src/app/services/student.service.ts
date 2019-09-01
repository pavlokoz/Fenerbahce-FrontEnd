import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../models/student';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlForCreateStudent: string = 'http://localhost:56833/api/Student/CreateStudent';
  private urlForGetStudent: string = 'http://localhost:56833/api/Student/GetStudent';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

    createStudent(student: Student, groupId: number): Observable<any> {
      let tokenData = 'Bearer ' + this.authService.getToken(),        
          headers = new HttpHeaders().
                      set('Content-Type', 'application/json').
                      set('Authorization', tokenData),        
         content = student,
         params = new HttpParams().
                      set('groupId', groupId.toString());
      
      return this._http.post(this.urlForCreateStudent, content, { headers: headers, params: params }).pipe(
          catchError(res => {
            this.snackBar.open("An Error Occured! Please, try again", "Got it", {
              duration: 2000
            });
            return this.handleError(res);
          })
      );
  }

  getStudent(studentId: number): Observable<Student> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
            set('studentId', studentId.toString());   

    return this._http.get<Student>(this.urlForGetStudent, { headers: headers, params: params }).pipe(
      catchError(this.handleError)
    );
  };

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