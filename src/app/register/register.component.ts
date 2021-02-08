import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailAddress: string = '';
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  isAdmin: boolean = false;

  error = false;
  msg = '';
  
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm){
    console.log(registerForm.value);
    this.authService.registerUser(registerForm.value).subscribe(data => {
      if(data["status"]){
        localStorage.setItem('currentUser', data["emailAddress"]);
        localStorage.setItem('loggedIn', '1');
        localStorage.setItem('loggedUserType', data["isAdmin"]);
        
        this.router.navigateByUrl('plants');
      }
      else {
        this.error = true;
        this.msg = "Unable to register user. Please try again";
      }
      
    });
  }

}
