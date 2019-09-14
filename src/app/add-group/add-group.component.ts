import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { SportService } from '../services/sport.service';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Group } from '../models/group';
import { Sport } from '../models/sport';
import { School } from '../models/school';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  public addGroupForm: FormGroup;
  public sports: Sport[];
  public schools: School[];

  constructor(private groupService: GroupService,
    private sportService: SportService,
    private schoolService: SchoolService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddGroupComponent>) { }

  ngOnInit() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.getSports();
    this.getSchools();
    this.initFormGroup();
  }

  addGroup(addGroupForm) {
    let group: Group = {
      GroupId: 0,
      GroupName: addGroupForm.groupName,
      SchoolId: addGroupForm.schoolId,
      SchoolName: null,
      SportId: addGroupForm.sportId,
      SportName: null,
      Students: null,
      Instructors: null
    };

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.groupService.createGroup(group).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Group is registered!", "Got it", {
        duration: 2000
      });
    });
  };

  hasError(controlName: string, errorName: string) {
    return this.addGroupForm.controls[controlName].hasError(errorName);
  };

  private initFormGroup() {
    this.addGroupForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
      sportId: new FormControl(0, [Validators.required, Validators.min(1)]),
      schoolId: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  };

  private getSports() {
    this.sportService.getSports().subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.sports = res;
    });
  };

  private getSchools() {
    this.schoolService.getSchools().subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.schools = res;
    });
  };
}
