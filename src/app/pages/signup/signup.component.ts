import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private api: ApiService) {}

  onSignup() {
    this.api
      .signup({ name: this.name, email: this.email, password: this.password })
      .subscribe(
        () => alert('Signup successful!'),
        (err) => alert('Signup failed'),
      );
  }
}
