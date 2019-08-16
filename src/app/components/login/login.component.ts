import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getEmail(value: string) {
    this.credentials.email = value;
  }

  getPass(value: string) {
    this.credentials.password = value;
  }

  login() {
    this.auth.loginWithEmail(this.credentials.email, this.credentials.password).then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      alert(error.message);
    });
  }

  signIn() {
    this.auth.signInWithEmail(this.credentials.email, this.credentials.password).then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      alert(error.message);
    });
  }

  loginGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      alert(error.message);
    });
  }
}
