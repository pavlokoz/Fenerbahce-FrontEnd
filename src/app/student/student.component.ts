import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { AuthorizationService } from '../services/authorization.service';
import { EditStudentComponent } from '../edit-student/edit-student.component';

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
    private router: Router,
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

  deleteStudent(): void {
    this.studentService.deleteStudent(this.student.StudentId).subscribe(response => {
      this.router.navigate(['/group/', this.student.GroupId]);
    });
  };

  editStudent(): void {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '540px',
      height: '450px',
      data: {
        Student: this.student,
        GroupId: this.student.GroupId
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
