import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PredictComponent } from './predict/predict.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'predict', component: PredictComponent },
  { path: 'home', component: HomePageComponent },
{ path: 'lm',component :LMDashComponent}  ,
{ path: 'CPO', component: CPODashComponent },
  { path: 'COO', component: COODashComponent },
  { path: 'SCPM', component: SCPMDashComponent },
  {path: 'PM', component: SCPMDashComponent},
  { path: 'chat', component: ChatComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
