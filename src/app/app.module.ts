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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListerOffreComponent,
    HomePageComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
