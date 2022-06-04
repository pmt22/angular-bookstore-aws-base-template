import { Component } from '@angular/core';
import Amplify, { API } from 'aws-amplify';
import { categories } from './models/category';
import { AuthenticationService } from './services/authentication.service';
import { Bookservice } from './services/book.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  public authenticated$ = this.auth.isAuthenticated$;

  constructor(private auth: AuthenticationService, private bookSvc: Bookservice){    
  }
}
