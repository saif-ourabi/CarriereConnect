import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  rep:any;
  c=false;


  constructor(private formBuilder: FormBuilder,private register: RegisterService,private router: Router) 
  {
    this.registrationForm = this.formBuilder.group({
      nom:['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      cin:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    this.c=true;
    this.registerUser();
  }

  onReset() {
    this.c=false;
    this.registrationForm.reset();
}

  registerUser() {
    if (this.registrationForm.valid) {  
      console.log(this.registrationForm.value);
      this.register.registerUser(this.registrationForm.value).subscribe( response => {
          if(response.status){
            this.router.navigate(['/Login']);
          }
          else{
            alert("User exists in the database");
          }
        }
          );
      
    }
    else{
    }
    }
  } 
