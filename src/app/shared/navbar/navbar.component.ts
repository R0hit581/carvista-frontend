import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string | null = null;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.auth$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
