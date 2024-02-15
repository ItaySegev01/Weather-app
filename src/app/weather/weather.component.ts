import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../interfaces/weather.interface';
import { CityService } from '../city.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    private cityService: CityService
  ) {}
  weather: any;

  displayWeather: Weather = {
    city: 'tel-aviv',
    summery: '',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    iconURL: '',
  };
  tempName: string = '';
  units: string = 'metric';
  showAlert: boolean = false;

  toggleUnits() {
    if (this.units === 'metric') {
      this.units = 'imperial';
    } else {
      this.units = 'metric';
    }
    this.setWeather();
  }

  setWeather() {
    this.showAlert = false;
    this.weatherService
      .getWeather(this.displayWeather.city, this.units)
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.displayWeather = {
            city: this.weather.name,
            summery: this.weather.weather[0].description,
            temp: this.weather.main.temp,
            feels_like: this.weather.main.feels_like,
            humidity: this.weather.main.humidity,
            pressure: this.weather.main.pressure,
            iconURL: `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`,
          };
        },
        error: (err) => {
          console.error(err);
          this.tempName = this.displayWeather.city;
          this.displayWeather.city = 'Not Found';
          this.displayWeather.iconURL = '';
          this.displayWeather.summery = 'Not Found';
          this.displayWeather.temp = 0;
          this.displayWeather.feels_like = 0;
          this.displayWeather.humidity = 0;
          this.displayWeather.pressure = 0;
          this.showAlert = true;
        },
      });
  }

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem(
      'cityText'
    ) as HTMLTextAreaElement;
    const cityText = textAreaElement.value;
    if (!cityText) return;
    if (cityText.trim() === '') return;

    if (this.cityService.isCityName(cityText)) {
      this.displayWeather.city = cityText;
      this.setWeather();
    } else {
      this.tempName = cityText;
      this.showAlert = true;
    }
  }

  ngOnInit(): void {
    this.setWeather();
  }
}
