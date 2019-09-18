import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isUserLogin: boolean;
  
  constructor(
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    setInterval(() => {    
      this.isUserLogin = this.authService.isLoginUser();
    }, 500);  
  }

  loginCallback() {
    this.isUserLogin = true;
  }
}
