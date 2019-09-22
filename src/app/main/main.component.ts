import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isUserLogin: boolean;

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.isUserLogin = this.globalService.isLoginUser();
    this.globalService.storageItem.subscribe(res => {
      this.isUserLogin = this.globalService.isLoginUser();
    });
  }

  loginCallback() {
    this.isUserLogin = true;
  }
}
