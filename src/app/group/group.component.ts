import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddInstructorComponent } from '../add-instructor/add-instructor.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { AuthorizationService } from '../services/authorization.service';
import { SpinnerService } from '../services/spinner.service';
import { Constants } from '../constants';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  private salaryTypes = Constants.InstuctorConstants.SalaryTypes;

  group: Group;
  displayedColumnsGroup = ['FirstName', 'LastName', 'DateOfBirth'];
  displayedInstructorColumns = ['FirstName', 'LastName', 'DateOfBirth', 'Salary', 'SalaryType'];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private authService: AuthorizationService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  getSalaryDescription(salaryCode: string): string {
    var salaryDefModel = this.salaryTypes.find(x => x.TypeCode == salaryCode);
    return salaryDefModel ? salaryDefModel.TypeDescription : '';
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

  private loadData() {
    this.spinnerService.ShowSpinner('LoadingProcess');
    let groupId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroupById(groupId).subscribe(response => {
      this.spinnerService.HideSpinner('LoadingProcess');
      this.group = response;
    });
  }
}
