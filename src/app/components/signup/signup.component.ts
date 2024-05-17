import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService:AuthService ,private router:Router){}

  register(regForm:NgForm){
    console.log(regForm.value)
    this.authService.registerUser(regForm.value.email,regForm.value.password)
  }
  reset(regForm:NgForm){
    regForm.reset()
}
}