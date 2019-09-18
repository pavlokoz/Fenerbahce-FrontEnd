import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Instructor } from '../models/instructor';
import { SalaryType } from '../models/salary-type';
import { InstructorService } from '../services/instructor.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from '../constants';
import { GroupInstructor } from '../models/group-instructor';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  public editInstructorForm: FormGroup;
  public instructors: Instructor[];
  public salaryTypes: SalaryType[];

  constructor(private instructorService: InstructorService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditInstructorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {  
    this.initFormInstructor();
    this.salaryTypes = Constants.InstuctorConstants.SalaryTypes;
    this.getInstructors();
    //this.createCallback = new EventEmitter();
  }

  editInstructor(editInstructorForm) {
    let groupInstructor: GroupInstructor = {
      InstructorId: editInstructorForm.Instructor,
      GroupId: this.data.GroupInstructor.GroupId,
      Salary: editInstructorForm.Salary,
      Type: editInstructorForm.Type,
      Instructor: null,
    };

    this.instructorService.updateInstructor(groupInstructor).subscribe(res => {
      this.dialogRef.close();
      this.snackBar.open("Instructor are update!", "Got it", {
        duration: 2000
      });
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.editInstructorForm.controls[controlName].hasError(errorName);
  };

  private initFormInstructor() {
    this.editInstructorForm = new FormGroup({
      Instructor: new FormControl(this.data.GroupInstructor.InstructorId, [Validators.required]),
      Salary: new FormControl(this.data.GroupInstructor.Salary, [Validators.required, Validators.min(1)]),
      Type: new FormControl(this.data.GroupInstructor.Type, [Validators.required]),
    });
  };

  private getInstructors() {
    this.instructorService.getInstructors().subscribe(res => {
      this.instructors = res;
    })
  }

}
