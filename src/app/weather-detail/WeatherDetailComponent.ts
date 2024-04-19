import { Component } from '@angular/core';
import { DataService, WeatherForecast, WeatherForecastDetail } from '../data.service';
import Chart from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent {

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  public forecastName: string | undefined = '';


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    var forecasts = this.dataService.getTopData();
    this.forecastName = forecasts.find(x => x.id == id)?.name;    
    this.generateChart(id);
  }

  generateChart(id: string): void {

    this.dataService.getForecastData(id).subscribe(data => {
      this.generateChart11(data);
    });
  }

  generateChart11(forecasts: WeatherForecastDetail): void {
    const ctx = document.getElementById('weatherChart') as HTMLCanvasElement;
    const dates = forecasts.properties.periods.map(forecast => forecast.startTime);
    const temperatures = forecasts.properties.periods.map(forecast => forecast.temperature);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
