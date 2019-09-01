import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student;
  displayedColumnsGroup = ['FirstName', 'LastName'];
  formInput: FormControl = new FormControl();

  constructor(private studentService: StudentService,
    private authService: AuthorizationService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  ModalParent(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '240px',
      height: 'auto',
      data: {
        StudentId: this.student.StudentId,
        searchCallback: 'searchParent'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadData();
    });    
  }

  private loadData() {
    let studentId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudent(studentId).subscribe(response => {
      this.student = response;
    });
  }
}
