import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User=new User();
  faUser=faUserCircle;
  errorMessage:string="";
  constructor(private autService:AuthenticationService,private router:Router) {

  }

  ngOnInit(): void {
    if(this.autService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
  }

  register(){
    this.autService.register(this.user).subscribe(data=>{
      this.router.navigate(['/login']);
      },err =>{
        if(err?.status===409){
          this.errorMessage="Username already exist!";
        }else{
          this.errorMessage="Unexpected error occured.Error is"+err?.errorMessage;
          console.log(err);
        }
      }

    )
  }

}
