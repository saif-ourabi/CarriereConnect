import { Component, OnInit } from '@angular/core';
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
  constructor(
    private offreserviceService: OffreserviceService,
    private route: ActivatedRoute,
    private login:LoginService
  ) {}

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
      console.log(this.status+" "+this.userid)
    });
  }
}
