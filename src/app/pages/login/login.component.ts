import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  onLogin() {
    this.api
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('role', response.role);
          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/add-car']);
          } else {
            alert('Login successful!');
            this.router.navigate(['/recommend-car']);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
