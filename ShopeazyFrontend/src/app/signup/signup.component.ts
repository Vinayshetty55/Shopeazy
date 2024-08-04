import { Component } from '@angular/core';
import { DemoAngularMaterailModule } from '../DemoAngularMaterailModule';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DemoAngularMaterailModule , FormsModule , ReactiveFormsModule , CommonModule , HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm! : FormGroup;
  hidePassword: boolean = false;

  constructor(private fb: FormBuilder,
    private snackBar : MatSnackBar,
    private authService : AuthService,
    private router : Router ){

  
  }

  ngOnInit() : void {
    this.signupForm = this.fb.group({
      name: [null ,[Validators.required]],
      email: [null ,[Validators.required , Validators.email]],
      password: [null ,[Validators.required]],
      confirmPassword: [null ,[Validators.required]]
    })
  }


  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void{
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.snackBar.open('Password Not Matching' , 'close' , { duration : 5000 ,panelClass : 'error-snackbar'});
      return ;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('sign up sucessfull!' , 'close' , { duration : 500 });
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Unable to Signup' , 'close' , { duration : 500 , panelClass : 'error-snackbar' });
      }
    )
  }


}
