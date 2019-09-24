import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../constants';
import { Event } from '../models/event';
import { CalendarEvent } from '../models/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private urlForCreateEvent: string = Constants.CurrentBackEndHost + 'api/Event/CreateEvent';
  private urlForUpdateEvent: string = Constants.CurrentBackEndHost + 'api/Event/UpdateEvent';
  private urlForUpdateEventDate: string = Constants.CurrentBackEndHost + 'api/Event/UpdateEventDate';
  private urlForDeleteEvent: string = Constants.CurrentBackEndHost + 'api/Event/Delete';
  private urlForGetSchoolEvents: string = Constants.CurrentBackEndHost + 'api/Event/GetSchoolEvents';
  private urlForGetGroupEvents: string = Constants.CurrentBackEndHost + 'api/Event/GetGroupEvents';
  private urlForGetEvent: string = Constants.CurrentBackEndHost + 'api/Event/GetEvent';

  constructor(private _http: HttpClient,
    private authService: AuthorizationService,
    private snackBar: MatSnackBar) { }

  getSchoolEvents(schoolId: number, monthId: number, year: number): Observable<CalendarEvent[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('schoolId', schoolId.toString()).
        set('monthId', monthId.toString()).
        set('year', year.toString());

    return this._http.get<CalendarEvent[]>(this.urlForGetSchoolEvents, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getGroupEvents(groupId: number, monthId: number, year: number): Observable<CalendarEvent[]> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('groupId', groupId.toString()).
        set('monthId', monthId.toString()).
        set('year', year.toString());

    return this._http.get<CalendarEvent[]>(this.urlForGetGroupEvents, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  getEventById(eventId: number): Observable<Event> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('eventId', eventId.toString());


    return this._http.get<Event>(this.urlForGetEvent, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  createEvent(event: Event, frequency: number, dueDate = new Date()): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      content = event,
      params = new HttpParams().
        set('eventFrequency', frequency.toString()).
        set('dueDate', dueDate.toISOString());

    return this._http.post(this.urlForCreateEvent, content, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  updateEvent(event: Event): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      content = event;

    return this._http.put(this.urlForUpdateEvent, content, { headers: headers }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  updateEventDate(eventId: number, eventDate: string): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('eventId', eventId.toString()).
        set('eventDate', eventDate);


    return this._http.put(this.urlForUpdateEventDate, null, { headers: headers, params: params }).pipe(
      catchError(res => {
        this.snackBar.open("An Error Occured! Please, try again", "Got it", {
          duration: 2000
        });
        return this.handleError(res);
      })
    );
  }

  deleteEvent(eventId: number): Observable<any> {
    let tokenData = 'Bearer ' + this.authService.getToken(),
      headers = new HttpHeaders().
        set('Content-Type', 'application/json').
        set('Authorization', tokenData),
      params = new HttpParams().
        set('eventId', eventId.toString());

    return this._http.delete(this.urlForDeleteEvent, { headers: headers, params: params }).pipe(
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
