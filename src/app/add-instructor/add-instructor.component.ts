import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { InstructorService } from '../services/instructor.service';
import { MatSnackBar, MatSnackBarModule, MatDialogRef } from '@angular/material';
import { GroupInstructor } from '../models/group-instructor';
import { Instructor } from '../models/instructor';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SalaryType } from '../models/salary-type';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent implements OnInit {

  //public createCallback: EventEmitter;
  public addInstructorForm: FormGroup;
  public instructors: Instructor[];
  public salaryTypes: SalaryType[];

  constructor(private instructorService: InstructorService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddInstructorComponent>,
    private spinnerService: SpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormInstructor();
    this.salaryTypes = Constants.InstuctorConstants.SalatyTypes;
    this.getInstructors();
    //this.createCallback = new EventEmitter();
  }

  addInstructor(addInstructorForm) {
    let groupInstructor: GroupInstructor = {
      InstructorId: addInstructorForm.Instructor,
      GroupId: this.data.GroupId,
      Salary: addInstructorForm.Salary,
      Type: addInstructorForm.Type
    };

    this.spinnerService.ShowSpinner('LoadingProcess');
    this.instructorService.addInstructor(groupInstructor).subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.dialogRef.close();
      this.snackBar.open("Instructor are registered!", "Got it", {
        duration: 2000
      });
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addInstructorForm.controls[controlName].hasError(errorName);
  };

  private initFormInstructor() {
    this.addInstructorForm = new FormGroup({
      Instructor: new FormControl(0, [Validators.required]),
      Salary: new FormControl(0, [Validators.required, Validators.min(1)]),
      Type: new FormControl('', [Validators.required]),
    });
  };

  private getInstructors() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.instructorService.getInstructors().subscribe(res => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.instructors = res;
    })
  }
}
