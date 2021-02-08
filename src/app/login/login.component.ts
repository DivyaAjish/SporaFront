import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailAddress: string = '';
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';

  error = false;
  msg = '';

  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  login(loginForm: NgForm){
    
    this.authService.loginUser(loginForm.value).subscribe(data => {
      if(data["status"] === true){
        console.log(data);
        localStorage.setItem('currentUser', data["emailAddress"]);
        localStorage.setItem('loggedIn', '1');
        localStorage.setItem('loggedUserType', data["isAdmin"]);
        
        this.router.navigateByUrl('plants');
      }
      else {
        this.error = true;
        this.msg = "Unable to login user. Please try again";
      }
      
    });
    
  }

}
