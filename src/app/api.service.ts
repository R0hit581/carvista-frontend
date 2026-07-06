import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; // use environment variable

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  addCar(car: any, token: string) {
    return this.http.post(`${this.baseUrl}/cars`, car, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  searchCars(filter: any, token: string) {
    return this.http.post(`${this.baseUrl}/recommend/search`, filter, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
