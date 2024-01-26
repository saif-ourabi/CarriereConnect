import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status: boolean = false;

  constructor(private router: Router, private login: LoginService) {}

  ngOnInit(): void {
    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
    });
  }

  logout(): void {
    this.login.logout();
  }
}
