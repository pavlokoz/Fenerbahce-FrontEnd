import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AuthorizationService } from '../services/authorization.service';
import { SpinnerService } from '../services/spinner.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns = ['FirstName', 'LastName', 'Email', 'DateOfBirth', 'Delete'];
  constructor(
    private userService: UserService,
    private authService: AuthorizationService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog
    ) { }

    IsAdmin() {
      return this.authService.isAdmin();
    }

    // openDialog(): void {
    //   const dialogRef = this.dialog.open(AddSchoolComponent, {
    //     width: '540px',
    //     height: '310px'
    //   });
  
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.loadData();
    //   });
    // }
  
    ngOnInit() {
      this.loadData();
    }

    deleteUser(userId: number) {
      this.userService.deleteUser(userId).subscribe(response => {
        this.loadData();
      });  
    }

    private loadData() {
      this.spinnerService.ShowSpinner('LoadingProcess');
      this.userService.getUsers().subscribe(response => {
        this.users = response;
        this.spinnerService.HideSpinner('LoadingProcess');
      });
    }

}
