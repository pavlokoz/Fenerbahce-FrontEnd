import { Component, OnInit, Output, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent implements OnInit {
  public schoolForm: FormGroup;
  private school: School;
  formData: FormData;

  constructor(private schoolService: SchoolService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.school = this.data.School;
    this.initFormGroup();
  }

  create(schoolFormValues) {
    this.schoolService.updateSchool(schoolFormValues.schoolName, this.school.SchoolId, this.formData).subscribe(res => {
      this.dialogRef.close();
      this.snackBar.open("School created!", "Got it", {
        duration: 2000
      });
    });
  };

  public initFormGroup() {
    this.schoolForm = new FormGroup({
      schoolName: new FormControl(this.school.SchoolName, [Validators.required]),
      logo: new FormControl(this.data.SchoolLogo)
    });
  };

  public onFileChanged(event) {
    let logo = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', logo, logo.name);
  };
}
