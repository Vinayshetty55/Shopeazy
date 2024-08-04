import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemoAngularMaterailModule } from '../DemoAngularMaterailModule';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ DemoAngularMaterailModule , FormsModule , ReactiveFormsModule , CommonModule , HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

//UserStorageService: UserStorageService;
loginForm! : FormGroup;
hidePassword = true;

constructor(private fb: FormBuilder,
  private snackBar : MatSnackBar,
  private authService : AuthService,
  private router : Router ){


}
ngOnInit():void{
  this.loginForm = this.fb.group({
    email: [null , [Validators.required]],
    password: [null,[Validators.required]],
  })
}
togglePasswordVisibility(){
  this.hidePassword = !this.hidePassword;
}

onSubmit(): void{
  const username = this.loginForm.get('email')!.value;
  const password = this.loginForm.get('password')!.value;


  this.authService.login(username , password).subscribe(
    (res) => {
      if(UserStorageService.isAdminLoggedIn()){
        this.router.navigateByUrl('admin/dashboard');
      }
      else if(UserStorageService.isCustomerLoggedIn()){
        this.router.navigateByUrl('customer/dashboard');
      }
    },
    (error) => {
      this.snackBar.open('Bad credentials' , 'ERROR' , { duration : 500  });
    }
  )
}


}