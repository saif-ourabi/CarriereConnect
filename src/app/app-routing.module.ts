import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerOffreComponent } from './offre/lister-offre/lister-offre.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailsComponent } from './offre/details/details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path:"listerOffre", component:ListerOffreComponent},
  {path:"home-page", component:HomePageComponent},
  { path:'', redirectTo: '/home-page', pathMatch: 'full' },
  {path: 'Details/:id', component: DetailsComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Footer', component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
