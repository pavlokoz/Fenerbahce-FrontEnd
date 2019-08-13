import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
 
  animal: string;

  groups: Group[] = [];
  displayedColumns = ['GroupName', 'MaxCountOfStudent', 'StartDate', 'EndDate', 'MonthPrice'];
  constructor(
    private groupService: GroupService,
    public dialog: MatDialog
    ) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddGroupComponent, {
        width: '540px',
        height: '580px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  

  ngOnInit() {
    this.groupService.getGroups().subscribe(response => {
      this.groups = response;
    });
  }
}