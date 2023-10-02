import { Component } from '@angular/core';

import { TempTypes } from '@sg-home/termostat';

import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SG Home Library Component Test Tool';

  public TempTypes = TempTypes;
  public theMinTemp: number = 15;
  public theMaxTemp: number = 75;
  public currentTemp: number = 24;
  public weatherTemp: number;

  constructor(private weatherService: WeatherService) {}

  setTemp(val:string, typ: TempTypes ) {
    switch(typ) {
      case TempTypes.Minimum:
        this.theMinTemp = Number(val);
        break;
      case TempTypes.Maximum:
        this.theMaxTemp = Number(val);
        break;
      case TempTypes.Current:
        this.currentTemp = Number(val);
      break;
      default:
        this.currentTemp = Number(val);
    }
  }

  public getWeatherData(city:string) {
    this.weatherService.getDataFromCity(city).toPromise().then((r: any) => {
      this.weatherTemp = r.main.temp;
    });
  }
}
