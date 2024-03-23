import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { candidatureService } from 'src/app/services/candidature.service';
import { LoginService } from 'src/app/services/login.service';
import { OffreserviceService } from 'src/app/services/offreservice.service';
import { CookieModule, CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offreId: string;
  offres: any[];
  offre: any;
  status: boolean;
  userid: any;
  user: any;
  CandidatureForm: FormGroup;
  c = false;
  constructor(
    private offreserviceService: OffreserviceService,
    private route: ActivatedRoute,
    private login: LoginService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private candidatureService: candidatureService,
  ) {
    this.CandidatureForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      cin: [''],
      email: ['', [Validators.required, Validators.email]],
      cv: ['', [Validators.required]],
      id_offre: [''],
      id_user:['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.offreId = params.get('id');
      this.userid=sessionStorage.getItem('userId');
    });

    this.offreserviceService.getOffres().subscribe((data) => {
      this.offres = data;
      this.offre = this.offres.find((obj) => obj.id_offre == this.offreId);
    });

    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
    });
  }

  enterforme() {
    this.login.getUserInfo().subscribe((rep) => {
      this.user = rep;
      const userId = this.userid.replace(/^"(.*)"$/, '$1');
      this.CandidatureForm.setValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        cin: this.user.cin,
        email: this.user.email,
        cv: '',
        id_offre: this.offreId,
        id_user: userId
      });
    });
  }

  submit() {
    this.c = true;
    if (this.CandidatureForm.valid) {
      console.log(this.CandidatureForm.value)
      this.candidatureService.psotule(this.CandidatureForm.value).subscribe((rep: any) => {
        if (rep.state==false) {
          if (rep.message =='Database error') {
            this.toast.error({detail: 'ERROR',summary: 'Tu as déjà postulé'});
          } else {
            this.toast.error({ detail: 'ERROR', summary: "L'offre a expiré"});
          }
        } else {
          this.toast.success({detail: 'SUCCÈS',summary: "L'opération a été effectuée avec succès",duration: 5000});
        }
      });
    }
  }
}
