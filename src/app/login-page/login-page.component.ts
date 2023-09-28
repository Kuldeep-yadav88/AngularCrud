import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import{NgToastService} from 'ng-angular-popup'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toast:NgToastService
  ){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  onLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      console.log(this.loginForm.value);
      this.authService.UserLogin(email,password).subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success Message",summary:"Login successful",duration:3000 })
          console.log(res.message);
          this.authService.storeToken(res.token)
          this.router.navigate(['dashboard'])

        },
        error:()=>{
          console.log('Login failed')
          this.toast.error({detail:"Error Message" ,summary:"Wrong credentials",duration:4000})
          setTimeout(() => {
            window.location.reload();
          }, 1000);

        }

      })

    }
    else{
      this.markFormGroupTouched(this.loginForm)
    }

  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
        }
    });
  }  
 }
