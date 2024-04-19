import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apigetLWXDataUrl = 'https://api.weather.gov/gridpoints/LWX/31,80/forecast'; // Replace this with your API endpoint
  private apigetTopDataUrl = 'https://api.weather.gov/gridpoints/TOP/31,80/forecast'; // Replace this with your API endpoint

  public forecasts: WeatherForecast[] = [
    {
      name: 'District of Columbia Forecast  ( LWX ) ',
      id: 'lwx',
      date: '2024-04-19',
      temperatureC: 25,
      temperatureF: 77,
      summary: 'Partly cloudy'
    },
    {
      name: 'Kansas Forecast ( TOP )',
      id: 'top',
      date: '2024-04-20',
      temperatureC: 22,
      temperatureF: 72,
      summary: 'Sunny with few clouds'
    }
  ];

  constructor(private http: HttpClient) { }

  getForecastData(id: string): Observable<WeatherForecastDetail> {
    var url = id == "lwx" ? this.apigetLWXDataUrl : this.apigetTopDataUrl;

    return this.http.get<WeatherForecastDetail>(url);
  }

  getTopData(): WeatherForecast[] {
    return this.forecasts;
  }
}


export interface WeatherForecastDetail {
  "@context": string[];
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: {
    unitCode: string;
    value: number;
  };
  periods: Period[];
}

export interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number | null;
  };
  dewpoint: {
    unitCode: string;
    value: number;
  };
  relativeHumidity: {
    unitCode: string;
    value: number;
  };
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface WeatherForecast {
  name: string;
  id: string;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


