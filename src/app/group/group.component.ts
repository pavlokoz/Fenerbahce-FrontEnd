import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;

  displayedColumnsGroup = ['FirstName', 'LastName', 'DateOfBirth', 'Email', 'PhoneNumber'];
  
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    public dialog: MatDialog) { }

    ModalStudent(): void {
      const dialogRef = this.dialog.open(AddStudentComponent, {
        width: '540px',
        height: '500px',
        data: {
          GroupId: this.group.GroupId
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  ngOnInit() {
    let groupId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroupById(groupId).subscribe(response => {
      this.group = response;
    });
  }
}
