import { Component, OnInit } from '@angular/core';
import { OffreserviceService } from '../services/offreservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  offres: any[];
  p: number = 1;
  constructor(private offreserviceService: OffreserviceService) { }

  ngOnInit(): void {
    this.offreserviceService.getOffres().subscribe(data => {
      this.offres = data;
    });
  }

}
