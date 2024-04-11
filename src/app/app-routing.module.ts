import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CreateComponent } from './components/create/create.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForumComponent } from './components/forum/forum.component';
import { AuthGuard } from './shared/guard.service';
import { LoggedGuard } from './shared/auth-guard.service';






const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  { path: 'catalog', component: CatalogComponent, data: { animation: 'catalog' } },
  { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] , data: { animation: 'catalog' } },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] }, 
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard], data: { animation: 'register' } }, 
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard]}, 
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent , canActivate: [AuthGuard] }, 
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
