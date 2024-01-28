import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status: boolean = false;

  constructor(private router: Router, private login: LoginService, private toast: NgToastService ) {}

  ngOnInit(): void {
    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
      if(isLoggedIn){
        this.toast.success({detail:"SUCCÈS",summary:'Vous êtes connecté',duration:5000})
      }
      else{
        this.toast.info({detail:"INFO",summary:'Vous êtes deconnecté',duration:5000})
      }
    });
  }

  logout(): void {
    this.login.logout();
  }
}