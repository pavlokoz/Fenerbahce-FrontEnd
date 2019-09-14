import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../models/student';
import { Constants } from '../constants';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
//public createCallback: EventEmitter;
public editStudentForm: FormGroup;

private namePattern: string = Constants.DataValidationConstants.NamePattern;
private student: Student;

constructor(private studentService: StudentService,
  private snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<EditStudentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit() {
  this.student = this.data.Student;
  this.initFormStudent();
  //this.createCallback = new EventEmitter();
}

editStudent(editStudentForm) {
  let student: Student = {
    FirstName: editStudentForm.FirstName,
    LastName: editStudentForm.LastName,
    StudentId: this.student.StudentId,
    DateOfBirth: editStudentForm.DateOfBirth,
    Patrimonial: editStudentForm.Patrimonial,
    GroupName: this.data.GroupName,
    GroupId: this.data.GroupId,
    Parents: null
  };

  this.studentService.updateStudent(student, this.data.GroupId).subscribe(res => {
    this.dialogRef.close();
    this.snackBar.open("Student are update!", "Got it", {
      duration: 2000
    });
  });
}

hasError(controlName: string, errorName: string) {
  return this.editStudentForm.controls[controlName].hasError(errorName);
};

private initFormStudent() {
  this.editStudentForm = new FormGroup({
    FirstName: new FormControl(this.student.FirstName, [Validators.required, Validators.pattern(this.namePattern)]),
    LastName: new FormControl(this.student.LastName, [Validators.required, Validators.pattern(this.namePattern)]),
    DateOfBirth: new FormControl(this.student.DateOfBirth, [Validators.required]),
    Patrimonial: new FormControl(this.student.Patrimonial)
  });
};

}
