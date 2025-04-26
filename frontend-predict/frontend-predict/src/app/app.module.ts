import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredictComponent } from './predict/predict.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { CPODashComponent } from './CPO/cpodash/cpodash.component';
import { COODashComponent } from './COO/coodash/coodash.component';
import { SCPMDashComponent } from './SCPM/scpmdash/scpmdash.component';
import { LMDashComponent } from './LM/lmdash/lmdash.component';
import { PMComponent } from './ProcurementManager/pm/pm.component';
import { ChatComponent } from './chat/chat.component'; 
@NgModule({
  declarations: [
    AppComponent,
    PredictComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    CPODashComponent,
    COODashComponent,
    SCPMDashComponent,
    LMDashComponent,
    PMComponent,
    ChatComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
