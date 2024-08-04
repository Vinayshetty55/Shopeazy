import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAngularMaterailModule } from './DemoAngularMaterailModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserStorageService } from './services/storage/user-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , DemoAngularMaterailModule , RouterLink , RouterLinkActive , HttpClientModule , CommonModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShopeazyFrontend';

  
  isAdminLogIn: boolean = UserStorageService.isAdminLoggedIn();
  isCustomerLogIn: boolean = UserStorageService.isCustomerLoggedIn();


  constructor(private router: Router){}

  ngOnInit(): void{
    this.router.events.subscribe(event => {
      this.isAdminLogIn = UserStorageService.isAdminLoggedIn();
      this.isCustomerLogIn = UserStorageService.isCustomerLoggedIn();
    })
  }


  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

}
