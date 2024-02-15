import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor() {}

  isCityName(input: string): boolean {
    const cityPattern = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
    return cityPattern.test(input);
  }
}
