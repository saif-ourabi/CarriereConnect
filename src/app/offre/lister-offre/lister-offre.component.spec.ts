import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerOffreComponent } from './lister-offre.component';

describe('ListerOffreComponent', () => {
  let component: ListerOffreComponent;
  let fixture: ComponentFixture<ListerOffreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListerOffreComponent]
    });
    fixture = TestBed.createComponent(ListerOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
