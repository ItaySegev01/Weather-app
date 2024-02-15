import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_KEY } from '../keys';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  getWeather(city: string, units: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
  }
}
