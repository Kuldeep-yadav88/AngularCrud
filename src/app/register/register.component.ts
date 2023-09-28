import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route:Router,
    private _http:HttpClient,
    private authService:AuthServiceService,
    private toast:NgToastService
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }
  onformSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.registerMe(formData).subscribe({
        next: (res: any) => {
          
          this.toast.success({detail:"Success Message",summary:"Registration successful",duration:3000 })
          setTimeout(() => {
            this.route.navigate(['']); 
          }, 1000);
        },
        error: () => {
          this.toast.warning({detail:"Error Message" ,summary:"Fill your Details",duration:4000})
        },
      });
    }
  }
  
}
