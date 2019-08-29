import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddSchoolComponent } from '../add-school/add-school.component';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  schools: School[] = [];
  displayedColumns = ['SchoolName'];
  constructor(
    private schoolService: SchoolService,
    public dialog: MatDialog
    ) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddSchoolComponent, {
        width: '540px',
        height: '310px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  
    ngOnInit() {
      this.schoolService.getSchools().subscribe(response => {
        this.schools = response;
      });
    }
}
