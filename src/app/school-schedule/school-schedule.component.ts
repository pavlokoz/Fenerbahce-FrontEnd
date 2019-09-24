import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddEventComponent } from '../add-event/add-event.component';
import { GroupService } from '../services/group.service';
import { SpinnerService } from '../services/spinner.service';
import { EventService } from '../services/event.service';
import { EventDisplay } from '../models/event-display';
import { CalendarEvent } from '../models/calendar-event';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { Event } from '../models/event';

@Component({
  selector: 'app-school-schedule',
  templateUrl: './school-schedule.component.html',
  styleUrls: ['./school-schedule.component.css']
})

export class SchoolScheduleComponent implements OnInit {
  events: EventDisplay[];
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;

  constructor(private groupService: GroupService,
    private spinnerService: SpinnerService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe) { }

  ngOnInit() {
  }

  handleDateChange() {
    this.loadData();
  }

  handleEventClick(info): void {
    let eventId: number = info.event._def.extendedProps.EventId;
    this.eventService.getEventById(eventId).subscribe(response => {
      this.updateEvent(response);
    });
  }

  eventDrop(info): void {
    let newDate: string = info.event.start.toISOString(),
      eventId: number = info.event._def.extendedProps.EventId;
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.eventService.updateEventDate(eventId, newDate).subscribe(response => {
      this.spinnerService.HideSpinner('LoadingProcess');
    });
}

  createEvent(): void {
    let schoolId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.spinnerService.ShowSpinner('LoadingProcess');
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '540px',
      height: 'auto',
      data: {
        GroupId: 0,
        loadGroups: ((loadCallBack) => {
          this.groupService.getSchoolGroups(schoolId).subscribe(response => {
            this.spinnerService.HideSpinner('LoadingProcess');
            loadCallBack(response);
          });
        })
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });
  }

  updateEvent(event: Event): void {
    const dialogRef = this.dialog.open(EditEventComponent, {
      width: '540px',
      height: 'auto',
      data: {
        Event: event
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });
  }

  private loadData(): void {
    let schoolId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.spinnerService.ShowSpinner('LoadingProcess');
    let month = this.calendarComponent.getApi().getDate().getMonth() + 1;
    let year = this.calendarComponent.getApi().getDate().getFullYear();
    this.eventService.getSchoolEvents(schoolId, month, year).subscribe(response => {
      this.events = response.map(x => this.mapResponse(x));
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

  private mapResponse(calendarEvent: CalendarEvent): EventDisplay {
    return {
      EventId: calendarEvent.EventId,
      title: calendarEvent.GroupName + ' \n' +
        new Date(calendarEvent.EventDate).toTimeString().substring(0, 9) + '\nDuration: ' +
        calendarEvent.Duration,
      date: this.datepipe.transform(new Date(calendarEvent.EventDate), 'yyyy-MM-dd')
    }
  }
}
