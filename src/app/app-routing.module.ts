import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerOffreComponent } from './offre/lister-offre/lister-offre.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsComponent } from './offre/details/details.component';

const routes: Routes = [
  {path:"listerOffre", component:ListerOffreComponent},
  {path:"home-page", component:HomePageComponent},
  { path:'', redirectTo: '/home-page', pathMatch: 'full' },
  {path: 'Details/:id', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
