// LoginComponent
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  c=false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.c=true
    if (this.loginForm.valid) {
      this.login.login(this.loginForm.value).subscribe((response) => {
        if (response.status) {
          sessionStorage.setItem('sessionId', response.sessionId || '');
          sessionStorage.setItem('userId', response.userId?.toString() || '');
          this.router.navigate(['/home-page']);
        } else {
          alert('Mot de passe ou email incorrect');
        }
      });
    }
  }
}
