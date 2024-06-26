import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { candidatureService } from 'src/app/services/candidature.service';
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
  status: boolean;
  CandidatureForm: FormGroup;
  c = false;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private offreserviceService: OffreserviceService,
    private route: ActivatedRoute,
    private login: LoginService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private candidatureService: candidatureService
  ) {
    this.CandidatureForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      cin: [''],
      email: ['', [Validators.required, Validators.email]],
      cv: ['', [Validators.required]],
      id_offre: [''],
      id_user: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.offreId = params.get('id');
      this.offreserviceService.getOffres().subscribe((data) => {
        this.offres = data;
        this.offre = this.offres.find((obj) => obj.id_offre == this.offreId);
      });
    });

    this.login.authStatus$.subscribe((isLoggedIn: boolean) => {
      this.status = isLoggedIn;
    });
  }

  enterforme() {
    this.login.getUserInfo().subscribe((rep: any) => {
      console.log(rep);
      this.CandidatureForm.patchValue({
        nom: rep.nom,
        prenom: rep.prenom,
        cin: rep.cin,
        email: rep.email,
        cv: '',
        id_offre: Number(this.offreId),
        id_user: rep.id_user
      });
    });
  }

  submit() {
    this.c = true;
    console.log(this.CandidatureForm.value);
    if (this.CandidatureForm.valid) {
      this.closeButton.nativeElement.click();
      this.candidatureService.psotule(this.CandidatureForm.value).subscribe((rep: any) => {
        console.log(rep)
        if (rep.state == false) {
          if (rep.message == 'tu as deja postules') {
            this.toast.error({ detail: 'ERROR', summary: 'Tu as déjà postulé' });
          } else {
            this.toast.error({ detail: 'ERROR', summary: "L'offre a expiré" });
          }
        } else {
          this.toast.success({ detail: 'SUCCÈS', summary: "L'opération a été effectuée avec succès", duration: 5000 });
        }
      });
    }
  }




}
