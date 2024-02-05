import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListerOffreComponent } from './offre/lister-offre/lister-offre.component';
import { HomePageComponent } from './home-page/home-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailsComponent } from './offre/details/details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { CandidatureComponent } from './offre/candidature/candidature.component';
import { AdminComponent } from './user/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListerOffreComponent,
    HomePageComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CandidatureComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
