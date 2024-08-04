import { Component } from '@angular/core';
import { DemoAngularMaterailModule } from '../../../DemoAngularMaterailModule';
import { FormBuilder, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [DemoAngularMaterailModule  , ReactiveFormsModule , CommonModule ],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {
categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(): void{
    this.categoryForm = this.fb.group({
      name: [null , [Validators.required]],
      description: [null , [Validators.required]]
    })
  }
addCategory(): void{
  if(this.categoryForm.valid){
    this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>
      {
        if(res.id != null){
          this.snackbar.open('Category Added' , 'close' , {duration:500})
        }else {
          this.snackbar.open(res.message , 'close' , {
            duration: 500,
            panelClass: 'error-sncakbar'
          });
        }
      }
    )
  }else{
    this.categoryForm.markAllAsTouched();
  }
  }
}

