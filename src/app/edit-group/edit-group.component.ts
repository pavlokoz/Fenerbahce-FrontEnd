import { Component, OnInit, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { SportService } from '../services/sport.service';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Group } from '../models/group';
import { Sport } from '../models/sport';
import { School } from '../models/school';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  public editGroupForm: FormGroup;
  private group: Group;
  public sports: Sport[];
  public schools: School[];

  constructor(private groupService: GroupService,
    private sportService: SportService,
    private schoolService: SchoolService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.group = this.data.Group;    
    this.getSports();
    this.getSchools();
    this.initFormGroup();
  }

  saveGroup(editGroupForm) {
    let group: Group = {
      GroupId: this.group.GroupId,
      GroupName: editGroupForm.groupName,
      SchoolId: editGroupForm.schoolId,
      SchoolName: null,
      SportId: editGroupForm.sportId,
      SportName: null,
      Students: null,
      Instructors: null
    };

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.groupService.updateGroup(group).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Group is updated!", "Got it", {
        duration: 2000
      });
    });
  };

  hasError(controlName: string, errorName: string) {
    return this.editGroupForm.controls[controlName].hasError(errorName);
  };

  private initFormGroup() {
    this.editGroupForm = new FormGroup({
      groupName: new FormControl(this.group.GroupName, [Validators.required]),
      sportId: new FormControl(this.group.SportId, [Validators.required, Validators.min(1)]),
      schoolId: new FormControl(this.group.SchoolId, [Validators.required, Validators.min(1)])
    });
  };

  private getSports() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.sportService.getSports().subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.sports = res;
    });
  };

  private getSchools() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.schoolService.getSchools().subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.schools = res;
    });
  };
}
