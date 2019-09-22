import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  storageItem = new Subject();

  setToken(tokenData: any): void {
    localStorage.setItem("user", btoa(JSON.stringify(tokenData)));
    this.storageItem.next(tokenData);
  }

  removeToken(): void {
    localStorage.removeItem("user");
    this.storageItem.next(null);
  }

  isLoginUser(): boolean {
    return this.getToken() !== null;
  }

  private getToken(): string {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(atob(localStorage.getItem("user")));
      return user ? user.access_token : null;
    } else {
      return null;
    }
  }
}