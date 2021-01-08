import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //extract the values from the form
    const email = form.value.email;
    const password = form.value.password;

    // check the mode we are in : Login or Sign Up
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
    } else {
    //send the sign up request
    this.authService.signup(email, password).subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });
    }
    //reset the form 
    form.reset();
  }

}
