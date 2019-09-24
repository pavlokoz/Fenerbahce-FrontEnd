import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../models/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private eventService: EventService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.initFormGroup();
    var el = document.querySelector('#time-input .mat-form-field-infix');
    el['style'].display = 'flex';
  }

  createEvent(eventForm): void {
    let eventTime: string = eventForm.eventTime;
    let eventDate: Date = eventForm.eventDate;
    eventDate.setHours(parseInt(eventTime.substr(0, 2)), parseInt(eventTime.substr(3, 2)));
    let event: Event = {
      EventId: this.data.Event.EventId,
      GroupId: this.data.Event.GroupId,
      EventTime: eventDate,
      Duration: eventForm.duration,
      AddInfo: eventForm.addInfo
    }

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.eventService.updateEvent(event).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Event is edited!", "Got it", {
        duration: 2000
      });
    });
  };

  private initFormGroup(): void {
    let eventTime: string = this.data.Event.EventTime.substr(11, 5);
    this.eventForm = new FormGroup({
      eventDate: new FormControl(this.data.Event.EventTime, [Validators.required]),
      eventTime: new FormControl(eventTime, [Validators.required]),
      duration: new FormControl(this.data.Event.Duration, [Validators.required, Validators.min(1)]),
      addInfo: new FormControl(this.data.Event.AddInfo)
    });
  };

}
