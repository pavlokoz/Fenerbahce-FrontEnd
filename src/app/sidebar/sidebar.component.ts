import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AuthorizationService } from '../services/authorization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isUserLogin: boolean;

  constructor(public dialog: MatDialog,
    private authService: AuthorizationService,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.isUserLogin = this.globalService.isLoginUser();
    this.globalService.storageItem.subscribe(res => {
      this.isUserLogin = this.globalService.isLoginUser();
    });
  }

  IsAdmin() {
    return this.authService.isAdmin();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: '540px',
      height: '760px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logOut(): void {
    this.globalService.removeToken();
    this.router.navigate(['/']);
  }
}
