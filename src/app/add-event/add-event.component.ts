import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Constants } from '../constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { SpinnerService } from '../services/spinner.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from '../models/group';
import { Event } from '../models/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  frequencies = Constants.EventConstants.EventFrequencies;
  eventForm: FormGroup;  
  groups: Group[];
  isGroupSectionEnabled: boolean = true;

  constructor(private eventService: EventService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.isGroupSectionEnabled = (this.data && this.data.GroupId != 0);    
    this.data.loadGroups((response: Group[]) => {
      this.groups = response;
    });
    this.initFormGroup();   
    var el = document.querySelector('#time-input .mat-form-field-infix');
    el.style.display = 'flex';     
  }

  createEvent(eventForm): void {
    let eventTime: string = eventForm.eventTime;
    let eventDate: Date = eventForm.eventDate;
    eventDate.setHours(parseInt(eventTime.substr(0, 2)), parseInt(eventTime.substr(3, 2)));
    let event: Event = {
        EventId: 0,
        GroupId: eventForm.groupId,
        EventTime: eventDate,
        Duration: eventForm.duration,
        AddInfo: eventForm.addInfo
    }

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.eventService.createEvent(event, eventForm.frequency, eventForm.dueDate || new Date()).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Event is added!", "Got it", {
        duration: 2000
      });
    });
  };

  isDueDateEnable(): boolean {
    return this.eventForm.value.frequency != 0;
  }

  private initFormGroup(): void {
    this.eventForm = new FormGroup({
      groupId: new FormControl(this.data.GroupId, [Validators.required, Validators.min(1)]),
      eventDate: new FormControl(null, [Validators.required]),
      eventTime: new FormControl('', [Validators.required]),
      duration: new FormControl(0, [Validators.required, Validators.min(1)]),
      addInfo: new FormControl(null),
      frequency: new FormControl(0),
      dueDate: new FormControl(null),
    });
  };
}
