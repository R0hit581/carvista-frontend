import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent {
  addCarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {
    this.addCarForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      power: ['', [Validators.required, Validators.min(1)]],
      mileage: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onAddCar() {
    if (this.addCarForm.invalid) {
      this.addCarForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('jwt') || '';

    this.api.addCar(this.addCarForm.value, token).subscribe({
      next: () => {
        alert('Car added successfully');
        this.addCarForm.reset();
      },

      error: (err) => {
        console.error(err);
        alert('Failed to add car');
      },
    });
  }
}
