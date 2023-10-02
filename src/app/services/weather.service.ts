import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let serviceUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey: string = 'd68d6bcf2b35dc82d45a49fcb7cc9ae6';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getDataFromCity(city: string) {
    return this.http.get(serviceUrl + '?q=' + city + '&APPID=' + apiKey + '&units=metric');
  }
}
