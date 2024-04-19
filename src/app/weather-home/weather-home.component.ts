import { Component, Inject } from '@angular/core';
import { DataService, WeatherForecast } from '../data.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent {

  constructor(private dataService: DataService) {

  }


  ngOnInit(): void {
    this.forecasts = this.dataService.getTopData();
  }


  public forecasts: WeatherForecast[] = [];

}
