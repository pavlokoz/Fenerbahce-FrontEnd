import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { News } from '../models/news';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private urlForGetNews: string = Constants.CurrentBackEndHost + 'api/News/GetAllNews';
  private urlForGetNewsDetail: string = Constants.CurrentBackEndHost + 'api/News/GetNewsById';
  private urlForCreateNews: string = Constants.CurrentBackEndHost + 'api/News/CreateNews';
  private urlForAddNewsImage: string = Constants.CurrentBackEndHost + 'api/News/AddNewsImage';
  private urlForGetNewsImage: string = Constants.CurrentBackEndHost + 'api/News/GetNewsImage';
  private urlForUpdateNews: string = Constants.CurrentBackEndHost + 'api/News/UpdateNews';
  private urlForDeleteNews: string = Constants.CurrentBackEndHost + 'api/News/DeleteNews';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  getNews(): Observable<News[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData);

    return this._http.get<News[]>(this.urlForGetNews, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getNewsById(newsId: number): Observable<News> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('newsId', newsId.toString());

    return this._http.get<News>(this.urlForGetNewsDetail, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getNewsImageById(newsId: number): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Authorization', tokenData),
      params = new HttpParams().
            set('newsId', newsId.toString());   

    return this._http.get(this.urlForGetNewsImage, { headers: headers, params: params, responseType: 'blob' }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  createNews(news: News): Observable<number> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      content = news;

    return this._http.post<number>(this.urlForCreateNews, content, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  addNewsImage(newsId: number, image: FormData): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Authorization', tokenData),
      content = image,
      params = new HttpParams().
        set('newsId', newsId.toString());

    return this._http.put(this.urlForAddNewsImage, content, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  updateNews(news: News): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      content = news;

    return this._http.put<number>(this.urlForUpdateNews, content, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  deleteNews(newsId: number): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('newsId', newsId.toString());

    return this._http.delete(this.urlForDeleteNews, { headers: headers, params: params }).pipe(
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
