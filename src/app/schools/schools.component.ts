import { Component, OnInit } from '@angular/core';
import { School } from '../models/school';
import { SchoolService } from '../services/school.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { AuthorizationService } from '../services/authorization.service';

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
    private authService: AuthorizationService,
    public dialog: MatDialog
    ) { }

    IsAdmin() {
      return this.authService.isAdmin();
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddSchoolComponent, {
        width: '540px',
        height: '310px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
    }
  
    ngOnInit() {
      this.loadData();
    }

    private loadData() {
      this.schoolService.getSchools().subscribe(response => {
        this.schools = response;
      });
    }
}
