import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gender-distribution-chart',
  templateUrl: './gender-distribution-chart.component.html',
  styleUrls: ['./gender-distribution-chart.component.css']
})

export class GenderDistributionChartComponent {

  public personData: Persons[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Persons[]>(baseUrl + 'person').subscribe(result => {
      this.personData = result;
    }, error => console.error(error));
  }

  public chart: any;

  createChartNew() {

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: this.personData.map(row => row.age),
        datasets: [
          {
            label: 'Person by Age and Gender',
            data: this.personData.map(row => row.gender)
          }
        ]
      }
    });

  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Age",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Gender",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }



  ngOnInit(): void {
    //this.createChartNew();
    this.createChart();
  }

}

interface Persons {
  id: number,
  age: number,
  gender: number,
}
