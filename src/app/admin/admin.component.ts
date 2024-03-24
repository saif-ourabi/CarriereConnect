import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OffreserviceService } from '../services/offreservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  offres: any[];
  p: number = 1;
  c = false;
  updateform: FormGroup;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private offreserviceService: OffreserviceService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    this.updateform = this.formBuilder.group({
      id: ['', Validators.required],
      Experience: ['', [Validators.required, Validators.min(0)]],
      Salaire: ['', [Validators.required, Validators.min(0)]],
      date_exp: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.offreserviceService.getOffres().subscribe(data => {
      this.offres = data;
    });
  }

  enterForm(id: any, exp: any, sal: any, dat: any, desc: any): void {
    this.updateform.setValue({
      id: id,
      Experience: exp,
      Salaire: sal,
      date_exp: dat,
      description: desc,
    });
  }

  deleteOffer(id: any): void {
    this.offreserviceService.deleteOffre(id).subscribe((rep: any) => {
      if (rep.status) {
        this.toast.success({ detail: "Offre supprimée avec succès", summary: 'Suppression réussie', duration: 5000 });
        window.location.reload();
      } else {
        this.toast.error({ detail: "Erreur lors de la suppression de l'offre", summary: 'Erreur', duration: 5000 });
      }
    });
  }

  submit(): void {
    this.c = true;
    if (this.updateform.valid) {
      this.closeButton.nativeElement.click();
      this.offreserviceService.updateOffre(this.updateform.value).subscribe((rep: any) => {
        if (rep.success) {
          this.toast.success({ detail: "Offre mise à jour avec succès", summary: 'Mise à jour réussie', duration: 5000 });
          this.loadOffres();
        } else {
          this.toast.error({ detail: "Erreur lors de la mise à jour de l'offre", summary: 'Erreur', duration: 5000 });
        }
      });
    }
  }
}
