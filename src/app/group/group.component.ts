import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddInstructorComponent } from '../add-instructor/add-instructor.component';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;

  displayedColumnsGroup = ['FirstName', 'LastName', 'DateOfBirth'];
  
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthorizationService,
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
