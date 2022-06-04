import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { BehaviorSubject } from "rxjs";
import { UserInfo } from "../models/userInfo";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor() {
    this.onInit();
  }

  private async onInit() {
    try {
      if (await Auth.currentSession()) {
        this._isAuthenticated$.next(true);
      }
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  public async login(email: string, password:string) {
    try {
      await Auth.signIn(email, password);
      this._isAuthenticated$.next(true);
    } catch (e) {
      alert(e.message);
    }
  }

  public async logout() {
    await Auth.signOut();
    this._isAuthenticated$.next(false);
  }

  public async currentUser():Promise<UserInfo> {
    return await Auth.currentUserInfo();
  }
}
