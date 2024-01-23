import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private offreserviceService: OffreserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.offreId = params.get('id');
      console.log('Received id from URL:', this.offreId);
    });
    
    this.offreserviceService.getOffres().subscribe((data) => {
      this.offres = data;
      this.offre = this.offres.find((obj) => obj.id_offre ==this.offreId);
    });
    
  }
}
