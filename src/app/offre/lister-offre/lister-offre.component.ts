import { Component, OnInit } from '@angular/core';
import { OffreserviceService } from '../../services/offreservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lister-offre',
  templateUrl: './lister-offre.component.html',
  styleUrls: ['./lister-offre.component.css']
})
export class ListerOffreComponent implements OnInit {
  offres: any[];
  p: number = 1;

  constructor(private offreserviceService: OffreserviceService) { }

  ngOnInit(): void {
    this.offreserviceService.getOffres().subscribe(data => {
      this.offres = data;
    });
  }
}
