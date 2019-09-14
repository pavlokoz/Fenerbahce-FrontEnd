import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  school: School;
  schoolLogo: any;
  displayedColumnsGroup = ['GroupName', 'SportName'];

  constructor(private schoolService: SchoolService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  editSchool(): void {
    const dialogRef = this.dialog.open(EditSchoolComponent, {
      width: '540px',
      height: '270px',
      data: {
        School: this.school,
        SchoolLogo: this.schoolLogo
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });
  }

  deleteSchool(): void {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.schoolService.deleteSchool(this.school.SchoolId).subscribe(response => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.router.navigate(['/schools']);
    });
  };  

  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    let schoolId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.schoolService.getSchoolById(schoolId).subscribe(response => {
      this.school = response;
      this.spinnerService.HideSpinner('LoadingProcess');
    });
    this.schoolService.getSchoolLogoById(schoolId).subscribe(response => {
      this.createImageFromBlob(response);
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

  private createImageFromBlob(image: Blob): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.schoolLogo = reader.result;
    }); 

    if (image && image.size > 0) {
       reader.readAsDataURL(image);
    }
  }  
}
