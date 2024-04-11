import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavigationComponent } from '../app/components/navigation/navigation.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { LoginComponent } from '../app/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../app/components/register/register.component';
import { CatalogComponent } from '../app/components/catalog/catalog.component';
import { CreateComponent } from '../app/components/create/create.component';
import { DetailsComponent } from '../app/components/details/details.component';
import { EditComponent } from '../app/components/edit/edit.component';
import { ForumComponent } from '../app/components/forum/forum.component';
import { AuthGuard } from './shared/guard.service'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
    EditComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
   ],

  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }