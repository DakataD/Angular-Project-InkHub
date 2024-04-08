import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guard.service'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent, data: {animation : 'scale'}},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'login', component: LoginComponent}, 
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent , canActivate: [AuthGuard]}, 
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}