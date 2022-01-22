import {Component} from '@angular/core';
import {User} from "./model/user.model";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./model/role.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-book-seller';

  currentUser:User=new User();

  constructor(private authService:AuthenticationService,private router:Router) {
    this.authService.currentUser.subscribe(data=>{
      this.currentUser=data;

    });
  }

  isAdmin(){
    return this.currentUser?.role===Role.ADMIN;
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
