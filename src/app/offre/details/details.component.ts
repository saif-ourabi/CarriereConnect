import { CandidatureComponent } from './../candidature/candidature.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { OffreserviceService } from 'src/app/services/offreservice.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offreId: string;
  offres: any[];
  offre: any;
  status:boolean;
  userid:any
  user:any
  CandidatureForm: any;
  c=false;
  constructor(private offreserviceService: OffreserviceService,private route: ActivatedRoute,private login:LoginService,private formBuilder: FormBuilder) {
    this.CandidatureForm = this.formBuilder.group({
      nom:["", [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom:["",[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      cin:["",[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(/^[0-9]+$/)]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.offreId = params.get('id');
    });

    this.offreserviceService.getOffres().subscribe((data) => {
      this.offres = data;
      this.offre = this.offres.find((obj) => obj.id_offre ==this.offreId);
    });

    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
      this.userid=sessionStorage.getItem('userId');
    });

  }

  enterforme(){
    this.login.getUserInfo().subscribe(
      (rep)=>{
        this.user=rep
        console.log(rep)
        this.CandidatureForm.setValue({
          nom: this.user.nom,
          prenom: this.user.prenom,
          cin:this.user.cin,
          email: this.user.email,
        });
        this.CandidatureForm.get('cin').disable();
      }
    )
  }

  }





