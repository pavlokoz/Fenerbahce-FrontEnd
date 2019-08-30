import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { StudentService } from '../services/student.service';
import { MatSnackBar, MatSnackBarModule, MatDialogRef } from '@angular/material';
import { Student } from '../models/student';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  //public createCallback: EventEmitter;
  public addStudentForm: FormGroup;

  private namePattern: string = Constants.DataValidationConstants.NamePattern;

  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormStudent();
    //this.createCallback = new EventEmitter();
  }

  addStudent(addStudentForm) {
    let student: Student = {
      FirstName: addStudentForm.FirstName,
      LastName: addStudentForm.LastName,
      StudentId: 0,
      DateOfBirth: addStudentForm.DateOfBirth,
      Patrimonial: addStudentForm.Patrimonial,
      GroupName: null,
      GroupId: this.data.GroupId,
      Parents: null
    };

    this.studentService.createStudent(student, this.data.GroupId).subscribe(res => {
      this.dialogRef.close();
      this.snackBar.open("Student are registered!", "Got it", {
        duration: 2000
      });
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addStudentForm.controls[controlName].hasError(errorName);
  };

  private initFormStudent() {
    this.addStudentForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      LastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      DateOfBirth: new FormControl(new Date(), [Validators.required]),
      Patrimonial: new FormControl('')
    });
  };
}
