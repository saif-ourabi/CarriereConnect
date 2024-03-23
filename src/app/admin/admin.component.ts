import { Component, OnInit } from '@angular/core';
import { OffreserviceService } from '../services/offreservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import FormBuilder and Validators

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

  constructor(
    private offreserviceService: OffreserviceService,
    private formBuilder: FormBuilder // Inject FormBuilder here
  ) {
    this.updateform = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      Experience: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      Salaire: [''],
      date_exp: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.offreserviceService.getOffres().subscribe(data => {
      this.offres = data;
      console.log(this.offres);
    });
  }


  enterforme(id,exp,sal,dat) {
      this.updateform.setValue({
        id:id,
        Experience:exp,
        Salaire:sal,
        date_exp:dat,
        description:"",
      });
    ;
  }

  deleteoffer(id): void {
    this.offreserviceService.deleteOffre(id).subscribe((rep: any) => {
      if (rep == 1) {
        this.ngOnInit();
      }
    });
  }
}
