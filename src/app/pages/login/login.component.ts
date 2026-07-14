import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, LoaderComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
  ) {}

  onLogin() {
    this.loading = true;
    this.api
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.authService.setSession(response.token, response.role);

          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/add-car']);
          } else {
            alert('Login successful!');
            this.router.navigate(['/recommend-car']);
          }
        },
        error: (err) => {
          this.loading = false;
          alert(err.error.message);
        },
      });
  }
}
