import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AuthorizationService } from '../services/authorization.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
 
  groups: Group[] = [];
  displayedColumns = ['GroupName', 'SportName', 'SchoolName'];
  constructor(
    private groupService: GroupService,
    private authService: AuthorizationService,    
    public dialog: MatDialog,
    private spinnerService: SpinnerService
    ) { }

    IsAdmin() {
      return this.authService.isAdmin();
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddGroupComponent, {
        width: '540px',
        height: '380px'
      });

      dialogRef.afterClosed().subscribe(res => {
        this.loadData();
      });
  }  

  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    this.groupService.getGroups().subscribe(response => {
      this.groups = response;
      this.spinnerService.HideSpinner('LoadingProcess');
    });
  }

  ngOnInit() {
    this.loadData();
  }
}