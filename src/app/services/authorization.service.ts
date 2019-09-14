import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Login } from '../models/login';
import { Constants } from '../constants';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {

    private urlForRegisterUser: string = Constants.AuthorizationServiceConstants.UrlForRegistration;
    private urlForLogin: string = Constants.AuthorizationServiceConstants.UrlForAuthorization;

    constructor(private _http: HttpClient,
        private snackBar: MatSnackBar) {
    }

    registerUser(user: User): Observable<any> {
        let tokenData = 'Bearer ' + this.getToken(),        
            headers = new HttpHeaders().
                        set('Content-Type', 'application/json').
                        set('Authorization', tokenData),        
           content = user;
        
        return this._http.post(this.urlForRegisterUser, content, { headers: headers }).pipe(
            catchError(res => {
                this.snackBar.open("An Error Occured! Please, try again", "Got it", {
                  duration: 2000
                });
                return this.handleError(res);
              })
        );
    }

    login(user: Login): Observable<any> {
        var headers = new HttpHeaders().
                        set('Content-Type', 'application/x-www-form-urlencoded').
                        set('Environement', 'Browser');
        var content = Constants.RegistrationConstants.GrantType + 
                      '&username=' + user.UserName + 
                      '&password=' + user.Password;
        return this._http.post(this.urlForLogin, content, { headers: headers }).pipe(
            catchError(res => {
                this.snackBar.open("An Error Occured! Please, try again", "Got it", {
                  duration: 2000
                });
                return this.handleError(res);
              })
        );
    }

    setAuthData(tokenData: any) {
        localStorage.setItem("user", btoa(JSON.stringify(tokenData)));
    }

    getToken(): string {
        if (localStorage.getItem("user")) {
            let user = JSON.parse(atob(localStorage.getItem("user")));
            return user ? user.access_token : null;
        } else {
            return null;
        }
    }

    isLoginUser(): boolean {
        return this.getToken() !== null;
    }

    isAdmin(): boolean {
        if (localStorage.getItem("user")) {
            let user = JSON.parse(atob(localStorage.getItem("user")));
            return user ? user.roleId == 1 : false;
        } else {
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem("user");
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
