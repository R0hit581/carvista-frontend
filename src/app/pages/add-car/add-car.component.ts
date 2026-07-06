import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent {
  brand = '';
  model = '';
  power!: number;
  mileage!: number;
  price!: number;

  constructor(private api: ApiService) {}

  onAddCar() {
    const token = localStorage.getItem('jwt') || '';
    this.api
      .addCar(
        {
          brand: this.brand,
          model: this.model,
          power: this.power,
          mileage: this.mileage,
          price: this.price,
        },
        token,
      )
      .subscribe(
        () => alert('Car added successfully!'),
        (err) => alert('Failed to add car'),
      );
  }
}
