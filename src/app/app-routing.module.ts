import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerOffreComponent } from './offre/lister-offre/lister-offre.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsComponent } from './offre/details/details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CandidatureComponent } from './offre/candidature/candidature.component';
import { AdminComponent } from './user/admin/admin.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:"listerOffre", component:ListerOffreComponent},
  {path:"home-page", component:HomePageComponent},
  { path:'', redirectTo: '/home-page', pathMatch: 'full' },
  {path: 'Details/:id', component: DetailsComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Footer', component: FooterComponent},
  {path: 'candidature', component:CandidatureComponent,canActivate:[UserGuard]},
  {path: 'admin', component:AdminComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
