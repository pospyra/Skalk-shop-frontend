import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
     private authService: AuthService,
     ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userCredentials = this.loginForm.value;
      this.authService.login(userCredentials).subscribe(
        () => {
          console.log('Вы вошли в систему')
        },
        (error) => {
          console.log('Не удалось войти')
        }
      );
    }
  }
}

