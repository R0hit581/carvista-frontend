import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommend-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recommend-car.component.html',
  styleUrl: './recommend-car.component.css',
})
export class RecommendCarComponent {
  brand = '';
  minPower!: number;
  minMileage!: number;
  maxPrice!: number;
  recommendations: any[] = [];

  constructor(private api: ApiService) {}

  onRecommend() {
    const token = localStorage.getItem('jwt') || '';

    const filter = {
      brand: this.brand || null,
      minPower: this.minPower || null,
      minMileage: this.minMileage || null,
      maxPrice: this.maxPrice || null,
    };

    this.api.searchCars(filter, token).subscribe({
      next: (cars: any) => {
        this.recommendations = cars;
      },
      error: () => {
        alert('Failed to fetch recommendations');
      },
    });
  }
}
