import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { candidatureService } from 'src/app/services/candidature.service';
import { OffreserviceService } from 'src/app/services/offreservice.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  combinedData: any[] = [];
  p: number = 1;

  constructor(
    private offreserviceService: OffreserviceService,
    private candidature: candidatureService,
  ) {}

  ngOnInit(): void {
    this.candidature.getcandidature().subscribe((userData) => {
      this.offreserviceService.getOffres().subscribe((offerData) => {
        if (Array.isArray(userData)) {
          const filteredOffers = offerData.filter((offer)=>
            userData.some((userOffer) => userOffer.id_offre === offer.id_offre)
          );

          this.combinedData = filteredOffers.map((offer) => {
            const matchingUser = userData.find((userOffer) => userOffer.id_offre === offer.id_offre);
            return { ...offer, user: matchingUser };
          });
        }
      });
    });
  }
}
