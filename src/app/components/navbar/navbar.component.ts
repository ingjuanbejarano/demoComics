import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.auth.logOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      alert(error);
    });
  }

  toFavorites() {
    this.router.navigate(['/favorites']);
  }

  toHome() {
    this.router.navigate(['/home']);
  }
}
