import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { StudentService } from '../services/student.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Student } from '../models/student';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  public createCallback: EventEmitter;
  @Inject(MAT_DIALOG_DATA) public data: any;
  public addStudentForm: FormGroup;

  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private Email: string = Constants.DataValidationConstants.EmailPattern;
  private pricePattern: string = Constants.DataValidationConstants.pricePattern;

  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initFormStudent();
    this.createCallback = new EventEmitter();
  }

  addStudent(addStudentForm) {
    let student: Student = {
      FirstName: addStudentForm.FirstName,
      LastName: addStudentForm.FirstName,
      Email: addStudentForm.Email,
      StudentId: 0,
      DateOfBirth: addStudentForm.DateOfBirth,
      PhoneNumber: addStudentForm.Phone
    };    

    this.studentService.createStudent(student, this.data.GroupId).subscribe(res => {
      this.snackBar.open("You are registered!", "Got it", {
        duration: 2000
      });
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.addStudentForm.controls[controlName].hasError(errorName);
  };

  private initFormStudent() {
    this.addStudentForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required,
                                      Validators.pattern(this.namePattern)]),
      LastName: new FormControl('', [Validators.required,
                                     Validators.pattern(this.namePattern)]),
      Email: new FormControl('', [Validators.required,
                                  Validators.pattern(this.Email)]),
      DateOfBirth: new FormControl(new Date(), [Validators.required]),
      Phone: new FormControl('', [Validators.required])
    });
  };

}
