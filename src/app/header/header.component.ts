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
  userRole=''

  constructor(private router: Router, private login: LoginService, private toast: NgToastService ) {}

  ngOnInit(): void {
    this.login.checkAuthStatus()
    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
      if(isLoggedIn){
        this.login.getUserInfo().subscribe((rep:any)=>{
          this.userRole=rep.role;
        })
      }
      else{
        this.toast.info({detail:"INFO",summary:'Vous êtes deconnecté',duration:5000})
      }
    });

  }

  logout(): void {
    this.login.logout()
    this.router.navigate(["/home-page"])
  }
}
