import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUserDTO } from 'src/app/models/user/new-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      contactInfo: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  register() {
    if (this.registrationForm.valid) {

      const newUser: NewUserDTO = this.registrationForm.value;
      this.authService.registration(newUser).subscribe(
        (response) => {
          this.router.navigateByUrl('/login');
          console.log('Вы зарегистрировались!')
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

}
