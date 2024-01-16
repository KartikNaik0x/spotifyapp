import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './authguard.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
{ path: '', redirectTo: '/registration', pathMatch: 'full' }, // Set the default route to registration
{ path: 'registration', component: RegistrationComponent  },
{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
{path: 'playlist',component:PlaylistComponent, canActivate: [AuthguardService]},
{path: 'forbidden',component:ForbiddenComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
