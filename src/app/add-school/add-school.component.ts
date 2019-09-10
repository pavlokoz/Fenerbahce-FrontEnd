import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {
  public schoolForm: FormGroup;
  formData: FormData;

  constructor(private schoolService: SchoolService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSchoolComponent>) { }

  ngOnInit() {
    this.initFormGroup();
  }

  create(schoolFormValues) {
    /*let school: School = {
      SchoolId: 0,
      SchoolName: schoolFormValues.schoolName,
      Groups: null
    };*/

    this.schoolService.createSchool(schoolFormValues.schoolName, this.formData).subscribe(res => {
      this.dialogRef.close();
      this.snackBar.open("School created!", "Got it", {
        duration: 2000
      });
    });
  };

  public initFormGroup() {
    this.schoolForm = new FormGroup({
      schoolName: new FormControl('', [Validators.required]),
      logo: new FormControl('')
    });
  };

  public onFileChanged(event) {
    let logo = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', logo, logo.name);
  };
}
