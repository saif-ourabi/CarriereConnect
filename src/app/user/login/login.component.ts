// LoginComponent
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  c = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService,
    private toast: NgToastService
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.c = true;
    if (this.loginForm.valid) {
      this.login.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.status) {
            console.log(response)
            this.login.getUserInfo().subscribe((rep)=>{
              console.log(rep);
            })
            this.toast.success({detail:"SUCCÈS",summary:'Vous êtes connecté',duration:5000})
            this.router.navigate(["/home-page"])

          } else {
             this.toast.error({detail:"ERROR",summary:"Mot de passe ou email incorrect"});
          }
        },
      );
    }
  }
  ngOnInit(): void {
    this.login.authStatus$.subscribe((rep)=>{
      if(rep){
        this.router.navigate(["/home-page"])
      }
    })
  }
}
