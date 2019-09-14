import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddInstructorComponent } from '../add-instructor/add-instructor.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { AuthorizationService } from '../services/authorization.service';
import { InstructorService } from '../services/instructor.service';
import { EditInstructorComponent } from '../edit-instructor/edit-instructor.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;

  displayedColumnsGroup = ['FirstName', 'LastName', 'DateOfBirth'];
  displayedInstructorColumns = ['FirstName', 'LastName', 'DateOfBirth', 'Edit', 'Delete'];
  
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthorizationService,
    private instructorService: InstructorService,
    private router: Router,
    public dialog: MatDialog) { }

    IsAdmin() {
      return this.authService.isAdmin();
    }

    ModalStudent(): void {
      const dialogRef = this.dialog.open(AddStudentComponent, {
        width: '540px',
        height: '450px',
        data: {
          GroupId: this.group.GroupId
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
    }

    editGroup(): void {
      const dialogRef = this.dialog.open(EditGroupComponent, {
        width: '540px',
        height: '370px',
        data: {
          Group: this.group
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
    }

    deleteGroup(): void {
      this.groupService.deleteGroup(this.group.GroupId).subscribe(response => {
        this.router.navigate(['/groups']);
      });
    };

    deleteInstructor(instructorId: number, groupId: number): void {
      this.instructorService.deleteInstructor(instructorId, groupId).subscribe(response => {
        this.loadData();
      });  
    };

    ModalInstructor(): void {
      const dialogRef = this.dialog.open(AddInstructorComponent, {
        width: '540px',
        height: '450px',
        data: {
          GroupId: this.group.GroupId
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
    }

    editInstructor(): void {
      const dialogRef = this.dialog.open(EditInstructorComponent, {
        width: '540px',
        height: '450px',
        data: {
          GroupId: this.group.GroupId
        }
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
    }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    let groupId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroupById(groupId).subscribe(response => {
      this.group = response;
    });
  }
}
